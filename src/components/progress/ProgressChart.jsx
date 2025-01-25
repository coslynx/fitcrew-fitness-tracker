import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '../../services/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/**
 * @interface ChartData
 * @description Interface for chart data.
 * @property {string[]} labels - Array of labels for the chart.
 * @property {Array<object>} datasets - Array of datasets for the chart.
 * @property {string} datasets[].label - Label for the dataset.
 * @property {number[]} datasets[].data - Data values for the dataset.
 * @property {string[]} datasets[].backgroundColor - Background colors for the bars.
 * @property {string[]} datasets[].borderColor - Border colors for the bars.
 * @property {number} datasets[].borderWidth - Border width for the bars.
 */
interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderColor: string[];
        borderWidth: number;
    }[];
}

/**
 * @function ProgressChart
 * @description A reusable component that fetches workout progress data and renders a bar chart.
 * @returns {JSX.Element} The rendered chart element.
 */
const ProgressChart = React.memo(function ProgressChart() {
    // Initialize component state
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * @function fetchProgressData
     * @description Fetches workout progress data from the API.
     * @returns {Promise<void>} - A promise that resolves when the data is fetched or rejects with an error
     * @async
     */
    const fetchProgressData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fetch progress data from the API endpoint
            const data = await api.get('/api/progress');
             // check for response data
            if (data) {
                // Log the success
                console.info('Progress data fetched successfully:', data);
                // Transform the data into chart format
                const labels = data.map((item: { date: string }) => item.date);
                const workoutData = data.map((item: { workouts: number }) => item.workouts);
                const chartDataset: ChartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Workouts',
                            data: workoutData,
                            backgroundColor: labels.map(() => 'rgba(54, 162, 235, 0.5)'),
                            borderColor: labels.map(() => 'rgba(54, 162, 235, 1)'),
                            borderWidth: 1,
                        },
                    ],
                };
                // Update the state with the fetched and transformed data
                setChartData(chartDataset);
            } else {
                // log error if no response
                 console.error('Failed to fetch progress data, response data is missing');
                // Set error state if no data is returned from API
                setError('Failed to fetch progress data, response data is missing');
            }

        } catch (err: any) {
            // Log the error message in console
            console.error('Error fetching progress data:', err);
            // Set the error message state
            setError(err.message || 'Failed to fetch progress data');
        } finally {
            // Set loading state to false after the api call is done
            setIsLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchProgressData();
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            title: {
                display: true,
                text: 'Workout Progress',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
             legend: {
                display: false
            }
        },
        scales: {
             x: {
                title: {
                  display: true,
                  text: 'Date',
                   font: {
                     weight: 'bold'
                   }
                }
              },
               y: {
                title: {
                  display: true,
                  text: 'Workouts',
                   font: {
                     weight: 'bold'
                   }
                },
                   beginAtZero: true
              }
         }
    };


    return (
        <div className="p-4" role="region" aria-label="Workout Progress Chart">
            {isLoading && <div className="text-center">Loading chart data...</div>}
            {error && <div className="text-red-500 text-center">Error fetching progress data: {error}</div>}
            {chartData ? (
                <Bar data={chartData} options={chartOptions}  />
            ) : (!isLoading && !error && <div className="text-center text-gray-500">No progress data available</div>)}
        </div>
    );
});

export default ProgressChart;