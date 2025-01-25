import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../src/components/common/Button';
import PropTypes from 'prop-types';

describe('Button Component', () => {
  it('renders the button with the correct text', () => {
    render(<Button text="Test Button" />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button text="Click Me" onClick={mockOnClick} />);
    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct style classes', () => {
    render(<Button text="Styled Button" style="bg-red-500 text-black" />);
    const button = screen.getByRole('button', { name: 'Styled Button' });
    expect(button).toHaveClass('bg-blue-500');
      expect(button).toHaveClass('text-white');
      expect(button).toHaveClass('font-bold');
    expect(button).toHaveClass('bg-red-500');
      expect(button).toHaveClass('text-black');
  });

    it('handles the disabled state correctly', () => {
        const mockOnClick = jest.fn();
        render(<Button text="Disabled Button" onClick={mockOnClick} disabled={true} />);
      const button = screen.getByRole('button', { name: 'Disabled Button' });
        expect(button).toBeDisabled();
      expect(button).toHaveClass('bg-gray-400');
        expect(button).toHaveClass('cursor-not-allowed');
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledTimes(0);
    });

    it('has correct aria-label', () => {
       render(<Button text="Aria Button" />);
        const button = screen.getByRole('button', { name: 'Aria Button' });
        expect(button).toHaveAttribute('aria-label', 'Aria Button');
    });

    it('has role button', () => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('role', 'button');
    });

    it('should have valid prop types', () => {
      expect(Button.propTypes).toEqual({
        text: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        type: PropTypes.string,
          style: PropTypes.string,
        disabled: PropTypes.bool
      });
    });

});