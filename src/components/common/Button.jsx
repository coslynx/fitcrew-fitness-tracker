import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function Button
 * @description A reusable button component that renders a button element with customizable text, styling, and click handler.
 * @param {object} props - The component's props.
 * @param {string} props.text - The text to display on the button.
 * @param {function} [props.onClick] - The click handler for the button.
 * @param {string} [props.type='button'] - The HTML type of the button.
 * @param {string} [props.style] - Additional CSS classes for styling.
 * @param {boolean} [props.disabled=false] - Indicates if the button is disabled
 * @returns {JSX.Element} The rendered button element.
 */
const Button = React.memo(function Button({ text, onClick, type = 'button', style, disabled=false }) {
  // default styling using Tailwind CSS
  const defaultStyle = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed';
    const combinedStyle = `${defaultStyle} ${style || ''}`;

  /**
   * @function handleClick
   * @description Handles the button click event.
   * @param {object} event - The click event object.
   */
  const handleClick = (event) => {
      if(disabled) {
          event.preventDefault();
           return;
      }
    try {
      if (onClick) {
          // call the onclick handler
          onClick(event);
      }
    } catch (error) {
        // log the error in the console
      console.error('Error in button click handler:', error);
    }
  };

  return (
    <button
      type={type}
      className={combinedStyle}
        onClick={handleClick}
        disabled={disabled}
        aria-label={text}
        role="button"
        >
      {text}
    </button>
  );
});

// Prop types for the component
Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.string,
    disabled: PropTypes.bool
};

export default Button;