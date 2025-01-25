import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useNavigate } from 'react-router-dom';

/**
 * @function Home
 * @description The landing page of the fitness tracker application, displaying a welcome message and a brief description.
 * @returns {JSX.Element} The rendered home page element.
 */
const Home = React.memo(function Home() {
  // Initialize navigation hook
  const navigate = useNavigate();
    // Initialize the name state with an empty string
    const [name, setName] = useState('');

    /**
     * @function handleGetStarted
     * @description Handles the button click event to navigate to the authentication form
     * @param {object} event - The click event object
     */
  const handleGetStarted = (event) => {
    try {
        // prevent the default action on click
       event.preventDefault();
        // navigate to the root path
      navigate('/');
    } catch (error) {
        // log error if navigation fails
      console.error('Error navigating to authentication page:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" role="document" aria-label="Home Page">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4" role="main">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" role="heading" aria-level={1}>
            Welcome to Fitness Tracker
          </h1>
            <p className="text-gray-600 mb-8" role="paragraph">
                Track your fitness goals, monitor your progress, and share your achievements with friends.
            </p>
            <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={setName}
                style="mb-4 mx-auto max-w-xs"
                aria-label="Name"
            />
          <Button
            text="Get Started"
            onClick={handleGetStarted}
            style="mx-auto"
            aria-label="Get Started"
              role="button"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
});

export default Home;