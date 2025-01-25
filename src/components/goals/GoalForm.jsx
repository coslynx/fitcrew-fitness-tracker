import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';
import { validateGoalName } from '../../utils/helpers';

/**
 * @function GoalForm
 * @description A reusable form component for creating or editing a fitness goal.
 * @param {object} props - The component's props.
 * @param {boolean} [props.edit=false] - Indicates if the form is for editing a goal, default is false (creating new goal).
 * @param {object} [props.goal] - The goal object containing goal details when editing a goal.
 * @param {number} props.goal.id - The unique identifier of the goal (required in edit mode).
 * @param {string} props.goal.title - The title of the goal (required in edit mode).
 * @param {string} [props.goal.description] - The description of the goal (optional in edit mode).
 * @param {number} props.goal.target - The target value for the goal (required in edit mode).
 * @param {string} [props.goal.unit] - The unit of measurement for the goal (optional in edit mode).
 * @param {function} props.onSubmit - The function called after successful API call, receives the newly created goal object.
 * @returns {JSX.Element} The rendered form element.
 */
const GoalForm = React.memo(function GoalForm({ edit = false, goal, onSubmit }) {
  // Initialize component state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [target, setTarget] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * @function validateInputs\
     * @description validates all the form inputs before submitting the request
     * @returns {boolean} - returns true if all validations are passed otherwise false
     */
    const validateInputs = () => {
        // Validate that title is not empty and it has valid format
        if (!title.trim()) {
            setError('Title cannot be empty');
            return false;
        }
        if (!validateGoalName(title)) {
            setError('Goal title must be between 3 and 50 characters');
            return false;
        }

        // Validate target is not empty and is a valid number
        if (!target.trim()) {
            setError('Target cannot be empty.');
            return false;
        }
        if (isNaN(Number(target))) {
            setError('Target must be a valid number.');
            return false;
        }
        return true;
    };
  
  // Populate form when in edit mode
  useEffect(() => {
    if (edit && goal) {
      setTitle(goal.title || '');
      setDescription(goal.description || '');
      setTarget(String(goal.target) || '');
      setUnit(goal.unit || '');
    }
  }, [edit, goal]);

  /**
   * @function handleSubmit
   * @description Handles the form submission event.
   * @param {object} event - The submit event object.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

      // validate the form before submission
      if(!validateInputs()){
          return;
      }

    setIsSubmitting(true);
    try {
      const goalData = {
        title: title.trim(),
        description: description.trim(),
        target: Number(target),
        unit: unit.trim(),
      };

        // send the correct request based on edit or create mode
      let response;
      if (edit && goal && goal.id) {
        response = await api.put(`/api/goals/${goal.id}`, goalData);
      } else {
        response = await api.post('/api/goals', goalData);
      }
          // check for success response
      if(response){
          // log the success
           console.info(`Goal ${edit ? 'updated' : 'created'} successfully.`, response);
           // call the on submit prop
          onSubmit(response);
      } else {
          // log error if no response
          console.error(`Failed to ${edit ? 'update' : 'create'} goal`, response);
        setError(`Failed to ${edit ? 'update' : 'create'} goal`);
      }
    } catch (err) {
        // log error and set error message
      console.error(`Error ${edit ? 'updating' : 'creating'} goal:`, err);
      setError(err.message || `Failed to ${edit ? 'update' : 'create'} goal`);
    } finally {
        // disable the submission state
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mx-auto max-w-md p-6 bg-white rounded shadow-md mt-10"
      onSubmit={handleSubmit}
        role="form"
        aria-label={`${edit ? 'Edit' : 'Create New'} Goal Form`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">{edit ? 'Edit Goal' : 'Create New Goal'}</h2>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={setTitle}
        style="mb-4"
          aria-label="Goal Title"
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={setDescription}
        style="mb-4"
          aria-label="Goal Description"
      />
      <Input
        type="text"
        placeholder="Target"
        value={target}
        onChange={setTarget}
        style="mb-4"
          aria-label="Goal Target"
      />
      <Input
        type="text"
        placeholder="Unit"
        value={unit}
        onChange={setUnit}
        style="mb-4"
          aria-label="Goal Unit"
      />
      <Button
        text={edit ? 'Update Goal' : 'Create Goal'}
        type="submit"
        disabled={isSubmitting}
          aria-label={edit ? 'Update Goal Button' : 'Create Goal Button'}
          role="button"
      />
        {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
});


// Prop types for the component
GoalForm.propTypes = {
  edit: PropTypes.bool,
    goal: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        target: PropTypes.number.isRequired,
        unit: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
};


export default GoalForm;