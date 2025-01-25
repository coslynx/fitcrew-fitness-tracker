import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @function Header
 * @description A reusable header component that renders the main header for the web application with navigation links.
 * @returns {JSX.Element} The rendered header element.
 */
const Header = React.memo(function Header() {
    return (
        <header className="flex justify-between items-center p-4" role="banner">
            <nav className="flex items-center" aria-label="Main Navigation">
                <div >
                    <Link to="/" className="font-bold text-xl" aria-label="Go to Homepage" role="link">
                        Fitness Tracker
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/dashboard" className="ml-4 text-blue-500 hover:text-blue-700" aria-label="Go to Dashboard" role="link">
                        Dashboard
                    </Link>
                    <Link to="/goals" className="ml-4 text-blue-500 hover:text-blue-700" aria-label="Go to Goals" role="link">
                        Goals
                    </Link>
                </div>
            </nav>
        </header>
    );
});

export default Header;