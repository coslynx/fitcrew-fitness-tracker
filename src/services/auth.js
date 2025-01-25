/**
 * @module auth
 * @description This module provides authentication services for a web application.
 * It handles user login, registration, and logout functionalities by making API calls to a backend server and managing JWT tokens.
 */
import api from './api';

/**
 * @interface Credentials
 * @description Interface for user credentials used in login and signup.
 * @property {string} username - The username of the user.
 * @property {string} password - The password of the user.
 */
interface Credentials {
  username: string;
  password: string;
}

/**
 * @function login
 * @description Logs in a user using the provided credentials.
 * @param {Credentials} credentials - The user's login credentials (username and password).
 * @returns {Promise<object>} - A promise that resolves with the user data on successful login.
 * @throws {Error} - If any error during the login process.
 */
async function login(credentials: Credentials): Promise<object> {
    try {
        // Send POST request to /api/auth/login endpoint using the api client.
      const response = await api.post('/api/auth/login', credentials);
      // check for response data
      if(!response){
        // log the error
        console.error('Login failed: Response data missing');
          // throw a new error
          throw new Error('Login failed: Response data missing');
      }
        // store the jwt token in local storage
      localStorage.setItem('token', response.token);
        // log the success
       console.info('Login successful');
         // return the user data from the response
      return response.user;
    } catch (error:any) {
        // log the error
      console.error('Login failed:', error.message || error);
       // throw the error so useAuth hook can handle it
      throw new Error(error.message || 'Login failed');
    }
}

/**
 * @function register
 * @description Registers a new user with the provided credentials.
 * @param {Credentials} credentials - The user's signup credentials (username and password).
 * @returns {Promise<object>} - A promise that resolves with the user data on successful signup.
 * @throws {Error} - If any error during the signup process.
 */
async function register(credentials: Credentials): Promise<object> {
  try {
        // Send POST request to /api/auth/register endpoint using the api client.
    const response = await api.post('/api/auth/register', credentials);
        // check for response data
      if(!response){
        // log the error
          console.error('Registration failed: Response data missing');
          // throw a new error
          throw new Error('Registration failed: Response data missing');
      }
        // store the jwt token in local storage
      localStorage.setItem('token', response.token);
    // log the success
       console.info('Registration successful');
       // return the user data from the response
    return response.user;
  } catch (error:any) {
      // log the error
    console.error('Registration failed:', error.message || error);
     // throw the error so useAuth hook can handle it
      throw new Error(error.message || 'Registration failed');
  }
}

/**
 * @function logout
 * @description Logs out the current user by clearing the JWT token from local storage.
 * @returns {Promise<void>} - A promise that resolves when the logout is complete.
 * @throws {Error} - If any error occurs during the logout process.
 */
async function logout(): Promise<void> {
  try {
        // remove the jwt token from local storage
    localStorage.removeItem('token');
      // log the success
     console.info('Logout successful');
  } catch (error:any) {
      // log the error
    console.error('Logout failed:', error.message || error);
      // throw the error so useAuth hook can handle it
    throw new Error(error.message || 'Logout failed');
  }
}

export { login, register, logout };