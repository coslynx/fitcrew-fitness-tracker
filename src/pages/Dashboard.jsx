import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProgressChart from '../components/progress/ProgressChart';
import WorkoutLog from '../components/progress/WorkoutLog';
import PostList from '../components/social/PostList';

/**
 * @function Dashboard
 * @description The main dashboard page for authenticated users, displaying workout progress, logs, and social media posts.
 * @returns {JSX.Element} The rendered dashboard page element.
 */
const Dashboard = React.memo(function Dashboard() {

  return (
    <div className="flex flex-col min-h-screen" role="document" aria-label="Dashboard Page">
        <Header />
        <main className="flex-grow p-4 flex flex-col gap-4" role="main">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2" role="region" aria-label="Workout Progress Chart">
                    <ProgressChart />
                </div>
                <div className="w-full md:w-1/2" role="region" aria-label="Social Media Posts">
                    <PostList />
                </div>
            </div>
              <div className="w-full" role="region" aria-label="Workout Log">
                 <WorkoutLog />
              </div>
        </main>
        <Footer />
    </div>
  );
});

export default Dashboard;