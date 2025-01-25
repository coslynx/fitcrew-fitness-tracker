import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GoalCard from './GoalCard';
import api from '../../services/api';

/**
 * @function GoalList
 * @description A reusable component that fetches and displays a list of fitness goals.
 * @returns {JSX.Element} The rendered list of goal cards.
 */
const GoalList = React.memo(function GoalList() {
    // Initialize component state
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


    /**
     * @function fetchGoals
     * @description Fetches goals data from backend using the API service
     * @returns {Promise<void>} - Returns a Promise that resolves when data is fetched or rejects with an error
     * @async
     */
  const fetchGoals = async () => {
      setIsLoading(true);
      setError(null);
    try {
        // Fetch goals from the API endpoint
        const data = await api.get('/api/goals');
        // check for response data
        if(data) {
            // log the success
            console.info('Goals fetched successfully:', data);
             // update the state with the fetched goals
            setGoals(data);
        } else {
            // log error if no response
            console.error('Failed to fetch goals, response data is missing');
             // set error state if no data is returned from API
            setError('Failed to fetch goals, response data is missing');
        }
    } catch (err) {
        // Log the error message in console
      console.error('Error fetching goals:', err);
       // Set the error message state
      setError(err.message || 'Failed to fetch goals');
    } finally {
        // Set loading state to false, after api call is done
      setIsLoading(false);
    }
  };

    // Fetch goals on component mount
  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <div className="p-4" role="region" aria-label="List of Goals">
        {/* Show loading message */}
        {isLoading && <div className="text-center">Loading goals...</div>}
        {/* show error message if there is any error */}
        {error && <div className="text-red-500 text-center">Error: {error}</div>}
        {/* Render the list of goals if present */}
        {goals && goals.length > 0 ? (
            <ul role="list" aria-label="List of goals">
                {goals.map((goal) => (
                    <li key={goal.id} role="listitem">
                        {/* Render each goal using the GoalCard component */}
                        <GoalCard goal={goal} />
                    </li>
                ))}
            </ul>
        ) : (
            !isLoading && !error && <div className="text-center text-gray-500">No goals available.</div>
        )}
    </div>
  );
});


export default GoalList;