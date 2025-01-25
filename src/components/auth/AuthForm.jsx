import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateEmail, validatePassword } from '../../utils/helpers';

/**
 * @function AuthForm
 * @description A reusable form component for user authentication, allowing users to either log in or sign up.
 * @returns {JSX.Element} The rendered form element.
 */
function AuthForm() {
  // Initialize the navigation hook
  const navigate = useNavigate();
  // Initialize the useAuth hook
  const { login, signup } = useAuth();
  // Initialize component state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * @function handleSubmit
     * @description Handles the form submission event
     * @param {object} event - The submit event object
     * @param {string} action - The type of action to be performed: 'login' or 'signup'
     */
  const handleSubmit = async (event, action) => {
    event.preventDefault();
      // reset any previous errors
    setError('');

        // validate the inputs before submission
      if (!username.trim()) {
        setError('Username cannot be empty.');
          return;
      }
      if (!password.trim()) {
          setError('Password cannot be empty.');
          return;
      }
      if(action === 'signup' && !validateEmail(username)){
          setError('Please enter a valid email address');
          return;
      }
      if(!validatePassword(password)) {
          setError('Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number and one special character.');
          return;
      }

    setIsSubmitting(true);
    try {
        // Perform login or signup based on the action
      let result;
      if (action === 'login') {
        result = await login({ username, password });
      } else {
        result = await signup({ username, password });
      }
        // check for errors
      if (typeof result === 'string') {
          // set the error if API returns an error message
        setError(result);
      } else {
        // Navigate to the dashboard if login/signup is successful
        navigate('/dashboard');
      }
    } catch (err) {
      // set the error message
      setError(err.message || 'Authentication failed.');
    } finally {
        // disable the submission state
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mx-auto max-w-md p-6 bg-white rounded shadow-md mt-10"
      onSubmit={(e) => e.preventDefault()}
        role="form"
      aria-label="Login or Signup Form"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login or Signup</h2>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={setUsername}
        style="mb-4"
        aria-label="Username"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
        style="mb-4"
        aria-label="Password"
      />
      <div className="flex justify-between mt-4">
        <Button
          text="Login"
          onClick={(e) => handleSubmit(e, 'login')}
          type="submit"
          style="mr-2"
          disabled={isSubmitting}
          aria-label="Login Button"
            role="button"
        />
        <Button
          text="Signup"
          onClick={(e) => handleSubmit(e, 'signup')}
          type="submit"
          disabled={isSubmitting}
          aria-label="Signup Button"
            role="button"
        />
      </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}

// Prop types for the component
AuthForm.propTypes = {
    onSubmit: PropTypes.func,
};

// Default prop values for the component
AuthForm.defaultProps = {
    onSubmit: () => {},
};
export default AuthForm;