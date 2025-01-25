import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import GoalList from '../components/goals/GoalList';
import GoalForm from '../components/goals/GoalForm';

/**
 * @function Goals
 * @description The main page for displaying and managing user goals within the Fitness Tracker application.
 * @returns {JSX.Element} The rendered goals page element.
 */
const Goals = React.memo(function Goals() {
    // Initialize state for tracking the created goal
    const [goalCreated, setGoalCreated] = useState(null);

    /**
     * @function handleGoalCreated
     * @description Handles the event when a new goal is created, logs the created goal object in the console
     * and updates the state to refresh the GoalList
     * @param {object} newGoal - The newly created goal object.
     */
    const handleGoalCreated = useCallback((newGoal) => {
        try {
            // Log the newly created goal
             console.info('New goal created successfully:', newGoal);
            // update the state to trigger the useEffect on GoalList to fetch goals again
            setGoalCreated(newGoal);
        } catch (error) {
            // Log error in console
            console.error('Error handling new goal creation:', error);
        }

    },[]);

    return (
        <div className="flex flex-col min-h-screen" role="document" aria-label="Goals Page">
            <Header />
            <main className="flex-grow p-4 flex flex-col gap-4" role="main">
                <GoalForm onSubmit={handleGoalCreated} aria-label="Create Goal Form"  />
                <GoalList  goalCreated={goalCreated} />
            </main>
            <Footer />
        </div>
    );
});

// Prop types for the component
Goals.propTypes = {
    onSubmit: PropTypes.func,
};

export default Goals;