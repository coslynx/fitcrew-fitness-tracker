import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import api from '../../services/api';

/**
 * @function PostList
 * @description A reusable component that fetches and displays a list of social media posts.
 * @returns {JSX.Element} The rendered list of social media posts.
 */
const PostList = React.memo(function PostList() {
    // Initialize component state
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * @function fetchPosts
     * @description Fetches posts data from backend using the API service
     * @returns {Promise<void>} - Returns a Promise that resolves when data is fetched or rejects with an error
     * @async
     */
    const fetchPosts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch posts from the API endpoint
            const data = await api.get('/api/posts');
            // check for response data
            if (data) {
                // log the success
                console.info('Posts fetched successfully:', data);
                // Update the state with the fetched posts
                setPosts(data);
            } else {
                // log error if no response
                console.error('Failed to fetch posts, response data is missing');
                // set error state if no data is returned from API
                setError('Failed to fetch posts, response data is missing');
            }
        } catch (err) {
            // Log the error message in console
            console.error('Error fetching posts:', err);
            // Set the error message state
            setError(err.message || 'Failed to fetch posts');
        } finally {
            // Set loading state to false, after api call is done
            setIsLoading(false);
        }
    };

    // Fetch posts on component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="p-4" role="region" aria-label="List of Social Posts">
            {/* Show loading message */}
            {isLoading && <div className="text-center">Loading posts...</div>}
            {/* show error message if there is any error */}
            {error && <div className="text-red-500 text-center">Error: {error}</div>}
            {/* Render the list of posts if present */}
            {posts && posts.length > 0 ? (
                <ul role="list" aria-label="List of Social media posts">
                    {posts.map((post) => (
                        <li key={post.id} role="listitem">
                            {/* Render each post using the Post component */}
                            <Post post={post} />
                        </li>
                    ))}
                </ul>
            ) : (
                !isLoading && !error && <div className="text-center text-gray-500">No social media posts available.</div>
            )}
        </div>
    );
});


export default PostList;