import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function Input
 * @description A reusable input component that renders an input element with customizable type, placeholder, value and change handler.
 * @param {object} props - The component's props.
 * @param {string} [props.type='text'] - The HTML type of the input element.
 * @param {string} [props.placeholder=''] - The placeholder text for the input element.
 * @param {*} props.value - The value of the input element.
 * @param {function} props.onChange - The change handler function for the input element.
 * @param {string} [props.style=''] - Additional CSS classes for styling.
 * @returns {JSX.Element} The rendered input element.
 */
const Input = React.memo(function Input({ type = 'text', placeholder = '', value, onChange, style = '' }) {
  // default styling using Tailwind CSS
  const defaultStyle = 'bg-white border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500';
  const combinedStyle = `${defaultStyle} ${style}`;

  /**
   * @function handleChange
   * @description Handles the input change event.
   * @param {object} event - The change event object.
   */
  const handleChange = (event) => {
      try {
           // call the onChange handler with the new input value
          onChange(event.target.value);
      } catch (error) {
           // log the error in the console
          console.error('Error in input change handler:', error);
      }

  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={combinedStyle}
        aria-label={placeholder}
    />
  );
});


// Prop types for the component
Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  style: PropTypes.string,
};

export default Input;