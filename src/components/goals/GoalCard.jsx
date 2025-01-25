import React from 'react';
import PropTypes from 'prop-types';

/**
 * @function GoalCard
 * @description A reusable component that displays a user's fitness goal details.
 * @param {object} props - The component's props.
 * @param {object} props.goal - The goal object containing goal details.
 * @param {number} props.goal.id - The unique identifier of the goal (required).
 * @param {string} props.goal.title - The title of the goal (required).
 * @param {string} [props.goal.description] - The description of the goal (optional).
 * @param {number} props.goal.target - The target value for the goal (required).
 * @param {number} [props.goal.progress=0] - The current progress of the goal (optional, default is 0).
 * @param {string} [props.goal.unit=''] - The unit of measurement for the goal (optional, default is '').
 * @returns {JSX.Element} The rendered goal card element.
 */
const GoalCard = React.memo(function GoalCard({ goal }) {
    // Destructure goal properties with default values for progress and unit
    const { id, title, description, target, progress = 0, unit = '' } = goal || {};

  // Error Handling for missing required props or incorrect types
  if (!goal || typeof goal !== 'object') {
      console.error('GoalCard: prop "goal" is missing or invalid.');
      return null;
  }
    if (typeof id !== 'number') {
        console.error('GoalCard: prop "goal.id" is missing or has incorrect type.');
        return null;
    }
    if (typeof title !== 'string') {
        console.error('GoalCard: prop "goal.title" is missing or has incorrect type.');
        return null;
    }
     if (typeof target !== 'number') {
        console.error('GoalCard: prop "goal.target" is missing or has incorrect type.');
        return null;
    }
    if (description && typeof description !== 'string') {
         console.error('GoalCard: prop "goal.description" has incorrect type, must be a string');
         return null;
     }
     if(progress && typeof progress !== 'number') {
        console.error('GoalCard: prop "goal.progress" has incorrect type, must be a number');
         return null;
     }

     if (unit && typeof unit !== 'string') {
         console.error('GoalCard: prop "goal.unit" has incorrect type, must be a string');
         return null;
     }


  return (
    <div className="bg-white p-4 rounded shadow-md" role="article" aria-label={`Goal card for ${title}`}>
        <h3 className="font-bold text-lg" role="heading" aria-level={3}>{title}</h3>
        {description && <p className="text-gray-700" role="paragraph">{description}</p>}
        <div className="text-sm text-gray-500 mt-2" role="region" aria-label={`Progress of ${title} goal`}>
            {progress} / {target} {unit}
        </div>
    </div>
  );
});


// Prop types for the GoalCard component
GoalCard.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        target: PropTypes.number.isRequired,
        progress: PropTypes.number,
        unit: PropTypes.string,
    }).isRequired,
};


export default GoalCard;