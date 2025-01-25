import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as authService from '../services/auth';

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
 * @function useAuth
 * @description Custom hook that provides authentication functionality including login, signup, logout and authentication status
 * @returns {object} - An object containing the authentication functions and user data.
 */
function useAuth() {
  // Access auth context
  const { user, isLoggedIn, login: setAuthUser, logout: setAuthLogout } = useContext(AuthContext);

    /**
     * @function login
     * @description Logs in a user using the provided credentials.
     * @param {Credentials} credentials - The user's login credentials (username and password).
     * @returns {Promise<object|string>} - A promise that resolves with the user data on successful login or an error message on failure.
     *  @throws {Error} - If any error during the login process.
    */
  const login = async (credentials: Credentials): Promise<object | string> => {
    try {
        // call the login method from auth service
      const userData = await authService.login(credentials);
      // update the auth context on successful login
      setAuthUser(userData);
      return userData;
    } catch (error:any) {
        // log detailed error in the console
      console.error('Login failed:', error);
       // return the error message
      return error.message || "Login Failed";
    }
  };

    /**
     * @function signup
     * @description Registers a new user with the provided credentials.
     * @param {Credentials} credentials - The user's signup credentials (username and password).
     * @returns {Promise<object|string>} - A promise that resolves with the user data on successful signup or an error message on failure.
     * @throws {Error} - If any error during the signup process.
    */
  const signup = async (credentials: Credentials): Promise<object| string> => {
    try {
        // call the signup method from auth service
      const userData = await authService.register(credentials);
       // update the auth context on successful signup
      setAuthUser(userData);
      return userData;
    } catch (error:any) {
        // log detailed error in the console
      console.error('Signup failed:', error);
       // return the error message
      return error.message || "Signup Failed";
    }
  };

    /**
     * @function logout
     * @description Logs out the current user.
     * @returns {Promise<void>} - A promise that resolves when the logout is complete or an error message on failure.
     * @throws {Error} - If any error occurs during the logout process.
    */
  const logout = async (): Promise<void> => {
    try {
        // call the logout method from auth service
      await authService.logout();
      // update the auth context on logout
      setAuthLogout();
    } catch (error:any) {
        // log detailed error in the console
      console.error('Logout failed:', error);
      // return the error message
      throw new Error(error.message || "Logout Failed");
    }
  };

    /**
     * @function isAuthenticated
     * @description Checks if a user is currently logged in.
     * @returns {boolean} - True if the user is logged in, false otherwise.
    */
  const isAuthenticated = (): boolean => {
    // return the isLoggedIn value from the auth context
    return isLoggedIn;
  };

    /**
     * @function user
     * @description Get the current logged in user.
     * @returns {object | null} - The current user object or null if no user is logged in
    */
  const currentUser = (): object | null => {
    // return the user object from the auth context
    return user;
  };


  // Memoize the hook to prevent unnecessary re-renders
  return useMemo(() => ({
    login,
    signup,
    logout,
    isAuthenticated,
    user: currentUser,
  }), [isLoggedIn, user]);
}

export default useAuth;


// Sample test cases (not actual tests):

/*
  // Test case 1: Successful login
  const { login } = useAuth();
  const credentials = { username: 'testuser', password: 'password123' };
  const result = await login(credentials);
  expect(result).toBeDefined(); // returns the user object, and state is updated in the context
  expect(result.username).toBe('testuser'); // verify properties in the user object


  // Test case 2: Failed login
  const { login } = useAuth();
   const credentials = { username: 'wronguser', password: 'wrongpassword' };
  const result = await login(credentials);
   expect(result).toBe('Invalid credentials'); // error from API or a generic error message

  // Test case 3: Successful signup
    const { signup } = useAuth();
  const credentials = { username: 'newuser', password: 'newpassword' };
  const result = await signup(credentials);
    expect(result).toBeDefined(); // returns the user object, and state is updated in the context
    expect(result.username).toBe('newuser'); // verify properties in the user object

  // Test case 4: Failed signup
    const { signup } = useAuth();
   const credentials = { username: 'existinguser', password: 'newpassword' };
   const result = await signup(credentials);
   expect(result).toBe('User already exists');  // error from API or a generic error message

  // Test case 5: Successful logout
  const { logout } = useAuth();
  await logout();
  expect(isAuthenticated()).toBe(false); // returns false after logout
  expect(user()).toBe(null); // returns null after logout

  // Test case 6: isAuthenticated returns false if user is not logged in
  const { isAuthenticated } = useAuth();
  expect(isAuthenticated()).toBe(false);


  // Test case 7: isAuthenticated returns true if user is logged in
  const { login, isAuthenticated } = useAuth();
  const credentials = { username: 'testuser', password: 'password123' };
    await login(credentials);
   expect(isAuthenticated()).toBe(true);


    // Test case 8: user returns the current user
     const { login, user } = useAuth();
  const credentials = { username: 'testuser', password: 'password123' };
    await login(credentials);
   expect(user()).toBeDefined();
  expect(user().username).toBe('testuser');

    // Test case 9: user returns null if not logged in
    const { user } = useAuth();
   expect(user()).toBe(null);
  */