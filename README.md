<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>
<h1 align="center">
  fitness-tracker-app
</h1>
<h4 align="center">Track fitness goals, monitor progress, and share achievements easily.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React Framework">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="Frontend Technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend Technology">
    <img src="https://img.shields.io/badge/Database-MongoDB_Atlas-brightgreen" alt="Database">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains a Minimum Viable Product (MVP) called "fitness-tracker-app", a web application designed for fitness enthusiasts to track their goals, monitor progress, and share achievements. Built using React for the frontend and Node.js for the backend, it provides user authentication, goal setting, progress tracking, and social sharing. The application uses MongoDB Atlas for the database.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **User Authentication**   | Secure user registration and login with JWT token-based session management using bcrypt for password hashing. |
| 🎯 | **Goal Setting**  | Users can set fitness goals with custom titles, descriptions, target values, and units.                                |
| 📈 | **Progress Tracking**   | Log workout progress and view it using interactive charts and tables for better tracking.     |
| 🤝 | **Social Sharing**| Users can share their updates and see other peoples posts in a social feed.    |
| ⚙️ | **Architecture**   | Follows a modular structure using React components and Node.js for a clean, maintainable codebase.             |
| 📄 | **Documentation**  | Includes detailed README file with setup, usage, and API documentation.              |
| 🔗 | **Dependencies**   |  Utilizes libraries like React, React Router, Axios, bcrypt, jsonwebtoken, Chart.js and Tailwind CSS.  |
| 🧩 | **Modularity**     |  Components and services are designed to be reusable and easily maintainable.  |
| 🧪 | **Testing**        | Includes unit tests using Jest to ensure the reliability and robustness of the codebase.     |
| ⚡️  | **Performance**    | Optimizes rendering and data fetching with React memo, caching and pagination (if needed).|
| 🔐 | **Security**       | Implements secure authentication and input validation to protect user data.      |
| 🔀 | **Version Control**| Uses Git for version control and GitHub for collaboration.       |
| 🔌 | **Integrations**   | Integrates with a MongoDB Atlas database for data storage and secure API for backend operations.      |
| 📶 | **Scalability**    | Uses a scalable architecture with cloud-based database and containerization for future scaling.           |

## 📂 Structure
```text
src
├── components
│   ├── common
│   │   ├── Button.jsx
│   │   └── Input.jsx
│   ├── layout
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── auth
│   │   └── AuthForm.jsx
│   ├── goals
│   │   ├── GoalCard.jsx
│   │   ├── GoalForm.jsx
│   │   └── GoalList.jsx
│   ├── progress
│   │   ├── ProgressChart.jsx
│   │   └── WorkoutLog.jsx
│   └── social
│       ├── Post.jsx
│       └── PostList.jsx
├── pages
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── Goals.jsx
├── hooks
│   └── useAuth.js
├── context
│   └── AuthContext.js
├── services
│   ├── api.js
│   └── auth.js
├── utils
│   └── helpers.js
└── styles
    └── global.css
public
    └── favicon.ico
tests
    ├── components
    │    └── Button.test.js
    └── utils
        └── helpers.test.js
.env
package.json
startup.sh
commands.json
README.md
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18.17.1 or higher
> - npm 6 or higher
> - MongoDB Atlas Account
  
### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-app.git
   cd fitness-tracker-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3.  Create a `.env` file in the root directory and add your API URL, MongoDB URI, and JWT secret:
    ```env
    API_URL=http://localhost:5000/api
    MONGODB_URI=mongodb://user:password@host:port/database
    JWT_SECRET=thisisareallylongandrandomstringforjwtsecret1234567890abcdefgh
    ```
   
   > [!NOTE]
    > Replace `http://localhost:5000/api` with your actual API URL.
    > Replace `mongodb://user:password@host:port/database` with your MongoDB Atlas connection string.
    > Replace `thisisareallylongandrandomstringforjwtsecret1234567890abcdefgh` with a secure secret key

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the React app on port 3000 and the Node.js server on port 5000.
2. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)

> [!TIP]
> ### ⚙️ Configuration
> - The `API_URL` is configured in the `.env` file, pointing to the backend server.
> - The `MONGODB_URI` is used to connect to your MongoDB Atlas database.
> - The `JWT_SECRET` is used to sign JWT tokens.

### 📚 Examples
Provide specific examples relevant to the MVP's core features. For instance:

- 📝 **User Registration**: 
  ```bash
  curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username": "newuser", "password": "securepass123"}'
  ```

- 📝 **Setting a Fitness Goal**: 
  ```bash
  curl -X POST http://localhost:5000/api/goals \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title": "My Goal", "description": "My description", "target": 10, "unit": "kg"}'
  ```

- 📝 **Logging Progress**: 
  ```bash
  curl -X POST http://localhost:5000/api/workouts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"date": "2024-01-01", "activity": "Running", "duration": 30, "calories": 300}'
  ```

## 🌐 Hosting
### 🚀 Deployment Instructions
#### Deploying to Heroku
1. Install the Heroku CLI:
   ```bash
   npm install -g heroku
   ```
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create fitness-tracker-app-production
   ```
4. Set up environment variables:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set API_URL=https://your-api-url.com/api
   heroku config:set MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database
   heroku config:set JWT_SECRET=your-jwt-secret
   ```
   
   > [!NOTE]
    > Replace the example values with your actual values for database and jwt secret

5. Deploy the code:
   ```bash
   git push heroku main
   ```
   
### 🔑 Environment Variables
- `API_URL`: URL for the backend API.
  Example: `https://your-api-url.com/api`
- `MONGODB_URI`: MongoDB connection string.
  Example: `mongodb+srv://user:password@cluster.mongodb.net/database`
- `JWT_SECRET`: Secret key for JWT token generation.
  Example: `your-256-bit-secret`
- `NODE_ENV`: Set the environment variable to "production".
   Example: `production`

## 📜 API Documentation
### 🔍 Endpoints
- **POST /api/auth/register**
    - Description: Registers a new user
    - Body: `{ "username": string, "password": string }`
    - Response: `{ "user": { "id": number, "username": string }, "token": string }`
- **POST /api/auth/login**
    - Description: Logs in an existing user
    - Body: `{ "username": string, "password": string }`
    - Response: `{ "user": { "id": number, "username": string }, "token": string }`
- **GET /api/goals**
    - Description: Gets all goals for the current user
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `Array<{ "id": number, "title": string, "description": string, "target": number, "unit": string  }>`
- **POST /api/goals**
    - Description: Creates a new goal
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "title": string, "description": string, "target": number, "unit": string }`
    - Response: `{ "id": number, "title": string, "description": string, "target": number, "unit": string  }`
-  **PUT /api/goals/:id**
    - Description: Updates a goal by id
    - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "title": string, "description": string, "target": number, "unit": string }`
    - Response: `{ "id": number, "title": string, "description": string, "target": number, "unit": string }`
-  **DELETE /api/goals/:id**
    - Description: Deletes a goal by id
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "message": "Goal deleted" }`
- **GET /api/progress**
    - Description: Gets progress data for all workouts
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `Array<{ "date": string, "workouts": number}>`
-  **POST /api/workouts**
    - Description: Creates a new workout entry
     - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "date": string, "activity": string, "duration": number, "calories": number }`
    - Response: ` { "id": number, "date": string, "activity": string, "duration": number, "calories": number }`
-  **PUT /api/workouts/:id**
    - Description: Updates a workout entry by id
     - Headers: `Authorization: Bearer TOKEN`
    - Body: `{ "date": string, "activity": string, "duration": number, "calories": number }`
    - Response: ` { "id": number, "date": string, "activity": string, "duration": number, "calories": number }`
-  **DELETE /api/workouts/:id**
    - Description: Deletes a workout entry by id
     - Headers: `Authorization: Bearer TOKEN`
    - Response: `{ "message": "Workout deleted" }`
- **GET /api/posts**
    - Description: Gets all social media posts
    - Headers: `Authorization: Bearer TOKEN`
    - Response: `Array<{ "id": number, "author": string, "content": string, "createdAt": string }>`

### 🔒 Authentication
1. Register or login to receive a JWT token.
2. Include the token in the `Authorization` header for all protected routes:
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```
3. The token is stored in local storage and automatically attached to requests via the `api.js` service.

### 📝 Examples
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"username": "fitnessuser", "password": "securepass123"}'

# Response
{
  "user": {
    "id": 1,
    "username": "fitnessuser"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
# Login a user
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"username": "fitnessuser", "password": "securepass123"}'

# Response
{
  "user": {
    "id": 1,
    "username": "fitnessuser"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}


# Create a new goal
curl -X POST http://localhost:5000/api/goals \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"title": "My Goal", "description": "My description", "target": 10, "unit": "kg"}'

# Response
{
  "id": 1,
  "title": "My Goal",
  "description": "My description",
  "target": 10,
  "unit": "kg"
}

# create a new workout log
curl -X POST http://localhost:5000/api/workouts \
-H "Content-Type: application/json" \
-H "Authorization: Bearer YOUR_JWT_TOKEN" \
-d '{"date": "2024-01-01", "activity": "Running", "duration": 30, "calories": 300}'

# Response
{
  "id": 1,
  "date": "2024-01-01",
  "activity": "Running",
  "duration": 30,
  "calories": 300
}
```


> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: fitness-tracker-app
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>