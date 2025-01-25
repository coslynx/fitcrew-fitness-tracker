import { formatDate, validateEmail, validatePassword, validateGoalName, calculateBMI } from '../../src/utils/helpers';

describe('helpers', () => {
    describe('formatDate', () => {
        it('should return a formatted date string for a valid date string', () => {
            const dateString = '2024-08-21T12:00:00.000Z';
            const formattedDate = formatDate(dateString);
            expect(formattedDate).toBe('2024-08-21');
        });

        it('should return a formatted date string for a different valid date string', () => {
            const dateString = '2023-01-05T05:00:00.000Z';
            const formattedDate = formatDate(dateString);
            expect(formattedDate).toBe('2023-01-05');
        });

        it('should return a formatted date string when date is in different format', () => {
          const dateString = '05/01/2024';
          const formattedDate = formatDate(dateString);
          expect(formattedDate).toBe('2024-01-05');
        });

        it('should return null for an invalid date string', () => {
            const dateString = 'invalid-date';
            const formattedDate = formatDate(dateString);
            expect(formattedDate).toBeNull();
        });

        it('should return null for an empty date string', () => {
           const dateString = '';
            const formattedDate = formatDate(dateString);
            expect(formattedDate).toBeNull();
        });

         it('should return null for null date string', () => {
            const dateString = null;
            const formattedDate = formatDate(dateString);
           expect(formattedDate).toBeNull();
        });

         it('should return null for undefined date string', () => {
            const dateString = undefined;
           const formattedDate = formatDate(dateString);
            expect(formattedDate).toBeNull();
        });

         it('should return null for wrong type date string', () => {
            const dateString = 12345;
           const formattedDate = formatDate(dateString);
            expect(formattedDate).toBeNull();
        });

    });

    describe('validateEmail', () => {
        it('should return true for a valid email address', () => {
            const email = 'test@example.com';
            const isValid = validateEmail(email);
            expect(isValid).toBe(true);
        });

        it('should return true for a different valid email address', () => {
            const email = 'user.name123@sub.domain.co.uk';
            const isValid = validateEmail(email);
            expect(isValid).toBe(true);
        });

         it('should return true for a valid email address with number', () => {
            const email = 'test123@example.com';
            const isValid = validateEmail(email);
            expect(isValid).toBe(true);
        });

        it('should return false for an invalid email address (missing @)', () => {
            const email = 'testexample.com';
            const isValid = validateEmail(email);
            expect(isValid).toBe(false);
        });

        it('should return false for an invalid email address (missing domain)', () => {
            const email = 'test@example';
            const isValid = validateEmail(email);
            expect(isValid).toBe(false);
        });

         it('should return false for an invalid email address (invalid chars)', () => {
            const email = 'test@example#com';
            const isValid = validateEmail(email);
            expect(isValid).toBe(false);
        });


        it('should return false for an empty email string', () => {
            const email = '';
            const isValid = validateEmail(email);
            expect(isValid).toBe(false);
        });

        it('should return false for non string email', () => {
             const email = 1234;
            const isValid = validateEmail(email);
           expect(isValid).toBe(false);
        });

    });

    describe('validatePassword', () => {
        it('should return true for a valid password', () => {
           const password = 'Password123!';
            const isValid = validatePassword(password);
            expect(isValid).toBe(true);
        });

        it('should return true for a different valid password', () => {
          const password = 'Test@123456';
            const isValid = validatePassword(password);
           expect(isValid).toBe(true);
       });

        it('should return true for a long valid password', () => {
          const password = 'Test@12345678901234567890';
          const isValid = validatePassword(password);
            expect(isValid).toBe(true);
        });


        it('should return false for a password with less than 8 characters', () => {
            const password = 'Pass1!';
            const isValid = validatePassword(password);
            expect(isValid).toBe(false);
        });

        it('should return false for a password without an uppercase letter', () => {
            const password = 'password123!';
            const isValid = validatePassword(password);
            expect(isValid).toBe(false);
        });

        it('should return false for a password without a lowercase letter', () => {
            const password = 'PASSWORD123!';
            const isValid = validatePassword(password);
            expect(isValid).toBe(false);
        });


        it('should return false for a password without a digit', () => {
          const password = 'Password!';
            const isValid = validatePassword(password);
           expect(isValid).toBe(false);
        });

         it('should return false for a password without a special character', () => {
            const password = 'Password123';
            const isValid = validatePassword(password);
            expect(isValid).toBe(false);
        });
        it('should return false for empty password', () => {
            const password = '';
            const isValid = validatePassword(password);
            expect(isValid).toBe(false);
        });

        it('should return false for non string password', () => {
             const password = 1234;
            const isValid = validatePassword(password);
           expect(isValid).toBe(false);
        });

    });

    describe('validateGoalName', () => {
        it('should return true for a valid goal name', () => {
            const goalName = 'Read a book';
            const isValid = validateGoalName(goalName);
            expect(isValid).toBe(true);
        });

        it('should return true for a different valid goal name', () => {
          const goalName = 'Learn a new skill';
            const isValid = validateGoalName(goalName);
            expect(isValid).toBe(true);
       });

      it('should return true for a goal name with max characters', () => {
           const goalName = 'a'.repeat(50);
           const isValid = validateGoalName(goalName);
            expect(isValid).toBe(true);
       });

        it('should return false for a goal name with less than 3 characters', () => {
            const goalName = 'ab';
            const isValid = validateGoalName(goalName);
            expect(isValid).toBe(false);
        });
        it('should return false for a goal name with more than 50 characters', () => {
          const goalName = 'a'.repeat(51);
            const isValid = validateGoalName(goalName);
            expect(isValid).toBe(false);
        });

        it('should return false for an empty goal name string', () => {
            const goalName = '';
            const isValid = validateGoalName(goalName);
            expect(isValid).toBe(false);
        });

        it('should return false for non string goal name', () => {
            const goalName = 1234;
            const isValid = validateGoalName(goalName);
            expect(isValid).toBe(false);
        });
    });

    describe('calculateBMI', () => {
        it('should return the correct BMI for valid height and weight', () => {
            const height = 1.75;
            const weight = 70;
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBe(22.86);
        });
      it('should return the correct BMI for valid height and weight with different values', () => {
         const height = 1.80;
            const weight = 80;
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBe(24.69);
        });
        it('should return the correct BMI when height is less than 1', () => {
            const height = 0.75;
            const weight = 40;
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBe(71.11);
        });
        it('should return null for invalid height', () => {
           const height = 'invalid';
            const weight = 70;
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBeNull();
        });

        it('should return null for invalid weight', () => {
            const height = 1.75;
           const weight = 'invalid';
           const bmi = calculateBMI(height, weight);
           expect(bmi).toBeNull();
        });

      it('should return null for invalid height and weight', () => {
          const height = 'invalid';
            const weight = 'invalid';
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBeNull();
        });

        it('should return null for zero height', () => {
           const height = 0;
           const weight = 70;
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBeNull();
        });
        it('should return null for non number height', () => {
          const height = 'abc';
           const weight = 70;
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBeNull();
        });
      it('should return null for non number weight', () => {
          const height = 1.75;
          const weight = 'abc';
            const bmi = calculateBMI(height, weight);
            expect(bmi).toBeNull();
        });

    });
});