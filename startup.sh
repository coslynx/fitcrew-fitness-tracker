#!/bin/bash
set -euo pipefail

if [ ! -f ".env" ]; then
  echo "Error: .env file not found. Please create a .env file in the project root." >&2
  exit 1
fi

source .env

if [ -z "$API_URL" ] || [ -z "$MONGODB_URI" ] || [ -z "$JWT_SECRET" ]; then
    echo "Error: Required environment variables are missing in .env" >&2
    exit 1
fi

PROJECT_ROOT=$(pwd)
LOG_FILE="$PROJECT_ROOT/startup.log"
BACKEND_PID_FILE="$PROJECT_ROOT/backend.pid"
FRONTEND_PID_FILE="$PROJECT_ROOT/frontend.pid"
DATABASE_PID_FILE="$PROJECT_ROOT/database.pid"

log_info() {
  date +"%Y-%m-%d %H:%M:%S - $1" | tee -a "$LOG_FILE"
}

log_error() {
  date +"%Y-%m-%d %H:%M:%S - ERROR: $1" | tee -a "$LOG_FILE" >&2
}

cleanup() {
  log_info "Cleaning up processes..."
  if [ -f "$BACKEND_PID_FILE" ]; then
    kill "$(cat "$BACKEND_PID_FILE")"
    rm "$BACKEND_PID_FILE"
    log_info "Backend process stopped"
  fi
  if [ -f "$FRONTEND_PID_FILE" ]; then
    kill "$(cat "$FRONTEND_PID_FILE")"
    rm "$FRONTEND_PID_FILE"
    log_info "Frontend process stopped"
  fi
   if [ -f "$DATABASE_PID_FILE" ]; then
    docker stop "$(cat "$DATABASE_PID_FILE")"
    rm "$DATABASE_PID_FILE"
    log_info "Database process stopped"
   fi
  log_info "Cleanup completed."
}

check_dependencies() {
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js v20.0.0"
        exit 1
    fi
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm v10.0.0"
        exit 1
    fi
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install docker"
        exit 1
    fi
    log_info "Dependencies are installed."
}


start_database() {
  log_info "Starting MongoDB database..."
  DATABASE_CONTAINER_ID=$(docker run -d --name mongodb_fitness -p 27017:27017 -v mongo-data:/data/db mongo:latest)
  echo "$DATABASE_CONTAINER_ID" > "$DATABASE_PID_FILE"
  log_info "MongoDB database started. Container ID: $DATABASE_CONTAINER_ID"
}

start_backend() {
  log_info "Starting backend server..."
  cd "$PROJECT_ROOT"
  cd backend
  npm install --package-lock-only
  npm ci
  export API_URL
  export MONGODB_URI
  export JWT_SECRET
  node server.js &
  BACKEND_PID=$!
  echo "$BACKEND_PID" > "$BACKEND_PID_FILE"
  log_info "Backend server started. PID: $BACKEND_PID"
  cd "$PROJECT_ROOT"
}

start_frontend() {
  log_info "Starting frontend..."
  cd "$PROJECT_ROOT"
  cd client
  npm install --package-lock-only
  npm ci
  export API_URL
  npm start &
  FRONTEND_PID=$!
  echo "$FRONTEND_PID" > "$FRONTEND_PID_FILE"
  log_info "Frontend started. PID: $FRONTEND_PID"
  cd "$PROJECT_ROOT"
}

trap cleanup EXIT ERR INT TERM

check_dependencies

start_database
start_backend
start_frontend
log_info "All services are up and running"
wait