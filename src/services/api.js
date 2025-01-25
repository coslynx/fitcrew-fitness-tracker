/**
 * @module api
 * @description This module provides a centralized API client for making HTTP requests to a backend server.
 * It uses axios for HTTP requests and includes interceptors for JWT token handling, error handling, and retry logic.
 */
import axios from 'axios';

// Create a singleton instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * @function retryRequest
 * @description Helper function to retry a failed request with a delay
 * @param {function} callback - The function to execute on each retry
 * @param {number} retries - The number of retries left
 * @param {number} delay - The delay in milliseconds
 * @returns {Promise<any>} - A Promise that resolves with the response or rejects after retries.
 * @async
 */
const retryRequest = async (callback, retries, delay) => {
    if (retries === 0) {
        throw new Error("Request failed after multiple retries");
    }
    try {
        return await callback();
    } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return await retryRequest(callback, retries - 1, delay);
    }
};


// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
      // Log any error during request interceptor phase
      console.error('Request interceptor error:', error);
      return Promise.reject(error);
  }
);

// Response interceptor for error handling and unauthorized status
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
      if(error.code === 'ERR_NETWORK'){
        // Log detailed network errors
        console.error('Network error:', error);
         // reject the error with a clear message for network failures
         return Promise.reject(new Error('Network error, Please check your connection'));
      }

    if (error.response) {
        // Log detailed API errors with response data
      console.error('API error:', error.response.status, error.response.data);
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token');
         // reject the error with a clear message for unauthorized responses
        return Promise.reject(new Error('Unauthorized'));
      }
     }

     // Retry the request if not an unauthorized error or network error
      const originalRequest = error.config;
      return retryRequest(
          () => axiosInstance.request(originalRequest), 3, 1000
      );
  }
);

/**
 * @constant api
 * @description The API client object with methods for making HTTP requests.
 * @property {function} get - Sends a GET request to the specified URL.
 * @property {function} post - Sends a POST request with the given data to the specified URL.
 * @property {function} put - Sends a PUT request with the given data to the specified URL.
 * @property {function} delete - Sends a DELETE request to the specified URL.
 */
const api = {
    /**
     * @function get
     * @description Sends a GET request to the specified URL.
     * @param {string} url - The URL to send the request to.
     * @param {object} [config={}] - Optional configuration for the request.
     * @returns {Promise<any>} - A Promise that resolves with the response data or rejects with an error.
     * @throws {Error} - If the request fails, an error with a message about retry failure or network error is thrown
     * @async
     */
  get: async (url, config = {}) => {
        try {
          return await axiosInstance.get(url, config);
      } catch (error) {
          // Log the error and rethrow for the calling function to handle
          console.error('GET request failed:', url, error);
          throw error;
      }
  },
    /**
     * @function post
     * @description Sends a POST request with the given data to the specified URL.
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send in the request body.
     * @param {object} [config={}] - Optional configuration for the request.
     * @returns {Promise<any>} - A Promise that resolves with the response data or rejects with an error.
     * @throws {Error} - If the request fails, an error with a message about retry failure or network error is thrown
     * @async
     */
  post: async (url, data, config = {}) => {
      try {
        return await axiosInstance.post(url, data, config);
    } catch (error) {
      // Log the error and rethrow for the calling function to handle
      console.error('POST request failed:', url, error);
        throw error;
    }
  },
    /**
     * @function put
     * @description Sends a PUT request with the given data to the specified URL.
     * @param {string} url - The URL to send the request to.
     * @param {object} data - The data to send in the request body.
     * @param {object} [config={}] - Optional configuration for the request.
     * @returns {Promise<any>} - A Promise that resolves with the response data or rejects with an error.
     * @throws {Error} - If the request fails, an error with a message about retry failure or network error is thrown
     * @async
     */
  put: async (url, data, config = {}) => {
        try {
            return await axiosInstance.put(url, data, config);
        } catch (error) {
            // Log the error and rethrow for the calling function to handle
            console.error('PUT request failed:', url, error);
          throw error;
        }
    },
    /**
     * @function delete
     * @description Sends a DELETE request to the specified URL.
     * @param {string} url - The URL to send the request to.
     * @param {object} [config={}] - Optional configuration for the request.
     * @returns {Promise<any>} - A Promise that resolves with the response data or rejects with an error.
     * @throws {Error} - If the request fails, an error with a message about retry failure or network error is thrown
     * @async
     */
  delete: async (url, config = {}) => {
        try {
            return await axiosInstance.delete(url, config);
        } catch (error) {
            // Log the error and rethrow for the calling function to handle
            console.error('DELETE request failed:', url, error);
          throw error;
        }
    },
};

export default api;