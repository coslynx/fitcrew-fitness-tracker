/**
 * @module helpers
 * @description This module provides utility functions for various tasks such as date formatting, email and password validation, goal name validation, and BMI calculation.
 * It includes pure functions that do not have side effects and always return the same output for the same input.
 */

/**
 * @function formatDate
 * @description Formats a date string to "YYYY-MM-DD" format.
 * @param {string} dateString - The date string to format.
 * @returns {string|null} - The formatted date string or null if the input is invalid.
 */
function formatDate(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return null;
        }
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } catch (error) {
        console.error('Error formatting date:', error);
        return null;
    }
}

/**
 * @function validateEmail
 * @description Validates an email string using a regular expression.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function validateEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * @function validatePassword
 * @description Validates a password string based on complexity criteria.
 * @param {string} password - The password string to validate.
 * @returns {boolean} - True if the password is valid, false otherwise.
 */
function validatePassword(password) {
    if (typeof password !== 'string') return false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
}

/**
 * @function validateGoalName
 * @description Validates a goal name string based on its length.
 * @param {string} goalName - The goal name string to validate.
 * @returns {boolean} - True if the goal name is valid, false otherwise.
 */
function validateGoalName(goalName) {
  if (typeof goalName !== 'string') return false;
  const trimmedGoalName = goalName.trim();
    return trimmedGoalName.length >= 3 && trimmedGoalName.length <= 50;
}

/**
 * @function calculateBMI
 * @description Calculates the Body Mass Index (BMI) given height and weight.
 * @param {number} height - The height in meters.
 * @param {number} weight - The weight in kilograms.
 * @returns {number|null} - The calculated BMI, rounded to two decimal places, or null if inputs are invalid.
 */
function calculateBMI(height, weight) {
  if (typeof height !== 'number' || typeof weight !== 'number' || isNaN(height) || isNaN(weight)) {
        return null;
    }
    if (height === 0) {
        return null;
    }
    const bmi = weight / (height * height);
    return parseFloat(bmi.toFixed(2));
}


export { formatDate, validateEmail, validatePassword, validateGoalName, calculateBMI };