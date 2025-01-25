import React from 'react';

/**
 * @function Footer
 * @description A reusable footer component that renders the footer for the web application, displaying copyright information.
 * @returns {JSX.Element} The rendered footer element.
 */
const Footer = React.memo(function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <div className="flex justify-center p-4">
            <footer role="contentinfo" aria-label="Footer">
                <span className="text-gray-500 text-sm">
                    © {currentYear} Fitness Tracker
                </span>
            </footer>
        </div>
    );
});

export default Footer;