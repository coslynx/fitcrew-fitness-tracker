import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import Input from '../common/Input';
import Button from '../common/Button';
import { formatDate, validateGoalName } from '../../utils/helpers';

/**
 * @function WorkoutLog
 * @description A reusable component that fetches and displays workout log entries.
 * @returns {JSX.Element} The rendered component element.
 */
const WorkoutLog = React.memo(function WorkoutLog() {
    // Initialize component state
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editWorkoutId, setEditWorkoutId] = useState(null);
    const [date, setDate] = useState('');
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');

    /**
     * @function fetchWorkouts
     * @description Fetches workout log data from the API.
     * @returns {Promise<void>} - A promise that resolves when the data is fetched or rejects with an error
     * @async
     */
    const fetchWorkouts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch workout data from the API endpoint
            const data = await api.get('/api/workouts');
            // check for response data
            if (data) {
                // Log the success
                console.info('Workout logs fetched successfully:', data);
                // Update the state with the fetched workout data
                setWorkouts(data);
            } else {
                // Log error if no response
                console.error('Failed to fetch workout logs, response data is missing');
                // Set error state if no data is returned from API
                setError('Failed to fetch workout logs, response data is missing');
            }

        } catch (err) {
            // Log the error message in console
            console.error('Error fetching workout logs:', err);
            // Set the error message state
            setError(err.message || 'Failed to fetch workout logs');
        } finally {
            // Set loading state to false after the api call is done
            setIsLoading(false);
        }
    };

    // Fetch workouts on component mount
    useEffect(() => {
        fetchWorkouts();
    }, []);


    /**
     * @function validateInputs
     * @description Validates the form input values before submission
     * @returns {boolean} Returns true if all inputs are valid, false otherwise
     */
    const validateInputs = () => {
        // Validate that all the inputs are not empty
        if (!date.trim() || !activity.trim() || !duration.trim() || !calories.trim()) {
            setError('All fields are required');
            return false;
        }

        // Validate date format
        if (!formatDate(date)) {
          setError('Invalid date format');
          return false;
        }
      // validate activity
      if(!validateGoalName(activity)) {
        setError('Activity must be between 3 and 50 characters');
        return false;
      }

        // Validate duration and calories are valid numbers
      if (isNaN(Number(duration)) || isNaN(Number(calories))) {
            setError('Duration and calories must be a valid number.');
            return false;
        }
        return true;
    };



    /**
     * @function handleSubmit
     * @description Handles the form submission for creating or updating workout entries.
     * @param {object} event - The submit event object.
     * @returns {Promise<void>} - A promise that resolves when submission is done or rejects with an error
     * @async
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        // Validate form inputs before submission
        if (!validateInputs()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const workoutData = {
                date: formatDate(date),
                activity: activity.trim(),
                duration: Number(duration),
                calories: Number(calories),
            };

          // send the correct request based on edit or create mode
           let response;
          if (editMode && editWorkoutId) {
                // If in edit mode, send a PUT request with workout ID
            response = await api.put(`/api/workouts/${editWorkoutId}`, workoutData);
          } else {
               // If not in edit mode, send a POST request to create a new workout
            response = await api.post('/api/workouts', workoutData);
          }

            // Check for response data
            if(response){
              // log the success
                console.info(`Workout ${editMode ? 'updated' : 'created'} successfully.`, response);
              // Fetch the updated workout logs
                await fetchWorkouts();
                // clear the form fields
                clearForm();
                // set the edit mode to false
                setEditMode(false);
              setEditWorkoutId(null);
            } else {
               // Log error if no response
                console.error(`Failed to ${editMode ? 'update' : 'create'} workout, response data is missing`, response);
              setError(`Failed to ${editMode ? 'update' : 'create'} workout`);
            }
        } catch (err) {
            // Log error and set error message
            console.error(`Error ${editMode ? 'updating' : 'creating'} workout:`, err);
            setError(err.message || `Failed to ${editMode ? 'update' : 'create'} workout`);
        } finally {
            // Disable the submission state
            setIsSubmitting(false);
        }
    };

  /**
   * @function clearForm
   * @description clears the form input values
   */
  const clearForm = () => {
    setDate('');
    setActivity('');
    setDuration('');
    setCalories('');
  };


    /**
     * @function handleDelete
     * @description Handles the deletion of a workout entry.
     * @param {number} id - The ID of the workout entry to delete.
     * @returns {Promise<void>} - A promise that resolves when deletion is complete or rejects with an error
     * @async
     */
    const handleDelete = async (id) => {
        setError('');
        setIsSubmitting(true);
        try {
            // Send DELETE request to the API endpoint
            const response = await api.delete(`/api/workouts/${id}`);
             // check for response data
            if(response) {
              // Log the success
                 console.info('Workout deleted successfully:', id);
                 // Fetch the updated workout logs
              await fetchWorkouts();
                 // clear the form fields
                 clearForm();
              // set the edit mode to false
                setEditMode(false);
              setEditWorkoutId(null);
             } else {
                // Log error if no response
                console.error('Failed to delete workout, response data is missing', response);
                // set error if no response data
                setError('Failed to delete workout, response data is missing');
             }
        } catch (err) {
            // Log the error message in console
            console.error('Error deleting workout:', err);
            // Set the error message state
             setError(err.message || 'Failed to delete workout');
        } finally {
           // Disable the submission state
            setIsSubmitting(false);
        }
    };


  /**
   * @function handleEdit
   * @description Handles the edit mode and loads current values to the form
   * @param {object} workout - the workout object
   */
  const handleEdit = (workout) => {
    setEditMode(true);
    setEditWorkoutId(workout.id);
    setDate(formatDate(workout.date));
    setActivity(workout.activity);
    setDuration(String(workout.duration));
    setCalories(String(workout.calories));
  };


    return (
        <div className="p-4" role="region" aria-label="Workout Log">
            {/* Show loading message */}
            {isLoading && <div className="text-center">Loading workout logs...</div>}
            {/* Show error message if there is an error */}
            {error && <div className="text-red-500 text-center">Error: {error}</div>}
            <form onSubmit={handleSubmit} className="mb-6" role="form" aria-label="Workout Form">
                <h3 className="text-xl font-semibold mb-4 text-center">{editMode ? 'Edit Workout' : 'Add Workout'}</h3>
                <Input
                    type="date"
                    placeholder="Date"
                    value={date}
                    onChange={setDate}
                    style="mb-2"
                    aria-label="Workout Date"
                />
                <Input
                    type="text"
                    placeholder="Activity"
                    value={activity}
                    onChange={setActivity}
                    style="mb-2"
                     aria-label="Workout Activity"
                />
                <Input
                    type="text"
                    placeholder="Duration (mins)"
                    value={duration}
                    onChange={setDuration}
                    style="mb-2"
                    aria-label="Workout Duration"
                />
                <Input
                    type="text"
                    placeholder="Calories"
                    value={calories}
                    onChange={setCalories}
                    style="mb-2"
                    aria-label="Workout Calories"
                />
              <Button
                    text={editMode ? 'Update' : 'Add Workout'}
                    type="submit"
                    disabled={isSubmitting}
                    aria-label={editMode ? 'Update Workout Button' : 'Add Workout Button'}
                />
            </form>
            {workouts && workouts.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300" role="table" aria-label="List of workout logs">
                        <thead>
                          <tr className="bg-gray-100" role="row">
                            <th className="py-2 px-4 border-b text-left font-bold" scope="col">Date</th>
                            <th className="py-2 px-4 border-b text-left font-bold" scope="col">Activity</th>
                            <th className="py-2 px-4 border-b text-left font-bold" scope="col">Duration</th>
                            <th className="py-2 px-4 border-b text-left font-bold" scope="col">Calories</th>
                            <th className="py-2 px-4 border-b text-left font-bold" scope="col">Actions</th>
                           </tr>
                        </thead>
                         <tbody role="rowgroup">
                          {workouts.map((workout) => (
                            <tr key={workout.id} role="row">
                                <td className="py-2 px-4 border-b" role="cell">{formatDate(workout.date)}</td>
                                <td className="py-2 px-4 border-b" role="cell">{workout.activity}</td>
                                <td className="py-2 px-4 border-b" role="cell">{workout.duration}</td>
                                <td className="py-2 px-4 border-b" role="cell">{workout.calories}</td>
                                 <td className="py-2 px-4 border-b" role="cell">
                                     <div className="flex space-x-2">
                                      <Button
                                        text="Edit"
                                        onClick={() => handleEdit(workout)}
                                        style="bg-yellow-500 hover:bg-yellow-700"
                                        aria-label={`Edit workout ${workout.id}`}
                                      />
                                     <Button
                                        text="Delete"
                                        onClick={() => handleDelete(workout.id)}
                                        style="bg-red-500 hover:bg-red-700"
                                       aria-label={`Delete workout ${workout.id}`}
                                    />
                                     </div>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !isLoading && !error && <div className="text-center text-gray-500">No workout logs available.</div>
            )}
        </div>
    );
});

// Prop types for the component
WorkoutLog.propTypes = {
    onSubmit: PropTypes.func,
};

export default WorkoutLog;