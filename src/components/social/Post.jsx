import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/helpers';

/**
 * @function Post
 * @description A reusable component that displays an individual social media post.
 * @param {object} props - The component's props.
 * @param {object} props.post - The post object containing post details.
 * @param {number} props.post.id - The unique identifier of the post (required).
 * @param {string} props.post.author - The author of the post (required).
 * @param {string} props.post.content - The content of the post (required).
 * @param {string} [props.post.createdAt] - The creation date of the post (optional, defaults to empty string).
 * @returns {JSX.Element|null} The rendered post element or null if required props are missing.
 */
const Post = React.memo(function Post({ post }) {
    // Destructure post properties with default value for createdAt
    const { id, author, content, createdAt = '' } = post || {};

    // Error handling for missing or invalid props
    if (!post || typeof post !== 'object') {
        console.error('Post: prop "post" is missing or invalid.');
        return null;
    }
    if (typeof id !== 'number') {
        console.error('Post: prop "post.id" is missing or has incorrect type.');
        return null;
    }
    if (typeof author !== 'string') {
        console.error('Post: prop "post.author" is missing or has incorrect type.');
        return null;
    }
    if (typeof content !== 'string') {
        console.error('Post: prop "post.content" is missing or has incorrect type.');
        return null;
    }
     if (createdAt && typeof createdAt !== 'string') {
        console.error('Post: prop "post.createdAt" has incorrect type, must be a string');
        return null;
    }


    let formattedDate;
    try {
        // format the date string if available
        formattedDate = formatDate(createdAt);
    } catch (error) {
        // log error if formatting fails
        console.error('Error formatting date:', error);
        formattedDate = null;
    }

    return (
        <div className="bg-white p-4 rounded shadow-md" role="article" aria-label={`Social media post by ${author}`}>
            <div className="mb-2" role="region" aria-label="Post header">
                <h3 className="font-bold text-lg" role="heading" aria-level={3}>{author}</h3>
                {formattedDate && <p className="text-gray-500 text-sm" role="paragraph">Posted on: {formattedDate}</p>}
            </div>
            <div role="region" aria-label="Post content">
                <p className="text-gray-700" role="paragraph">{content}</p>
            </div>
        </div>
    );
});


// Prop types for the Post component
Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
    }).isRequired,
};


export default Post;