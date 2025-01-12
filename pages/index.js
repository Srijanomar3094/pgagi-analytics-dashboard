import { useEffect, useState } from 'react';
import { getWeather } from '../lib/weather';
import { getFinance } from '../lib/finance';
import DashboardLayout from '@/components/DashboardLayout';
import { Line, Bar } from 'react-chartjs-2'; // Import Line and Bar charts
import { Chart as ChartJS, Title,PointElement, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
// import { Newspaper, Cloud, DollarSign } from 'lucide-react';
import { ArrowRight, Cloud, Newspaper, DollarSign } from "lucide-react";

ChartJS.register(Title, Tooltip, Legend,PointElement, LineElement, BarElement, CategoryScale, LinearScale);

export default function Home() {
  const [weather, setWeather] = useState([]);
  const [finance, setFinance] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    async function fetchData() {
      const cities = ['New York', 'London', 'Tokyo', 'Paris', 'Mumbai', 'Sydney'];
      const weatherData = await Promise.all(cities.map(city => getWeather(city)));
      setWeather(weatherData);

      // const stocks = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'NFLX'];
      // const financeData = await Promise.all(stocks.map(symbol => getFinance(symbol)));
      // setFinance(financeData);
    }

    fetchData();
  }, []);

  // Weather Chart Configuration
  const weatherChartData = {
    labels: weather?.map(city => city.name) || [], // City names
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weather?.map(city => city.main.temp) || [], // Temperatures
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 1)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 2,
      },
    ],
  };

  // Finance Chart Configuration
  const financeChartData = {
    labels: finance?.map(stock => stock.symbol) || [], // Stock symbols
    datasets: [
      {
        label: 'Stock Price',
        data: finance?.map(stock => stock.price) || [], // Prices
        backgroundColor: finance?.map(stock =>
          stock.change >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
        ), // Green for positive, red for negative
        borderWidth: 1,
      },
    ],
  };

  return (
    <DashboardLayout>
      {/* Title and Subtitle */}
      <div className="text-center mb-8">
          <h1 className="text-4xl mt-6 font-bold text-gray-800 dark:text-gray-100 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-16">
            Get an overview of your analytics and insights
          </p>
        </div>
        <main className="mb-2 p-2 space-y-6">
          <div className="flex justify-between gap-x-6">
            {/* Weather Graph */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Weather Data</h2>
              <div className="w-full h-64">
                <Line data={weatherChartData} />
              </div>
            </div>

            {/* Finance Bar Graph */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex-1">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Finance Data</h2>
              <div className="w-full h-64">
                <Bar data={financeChartData} />
              </div>
            </div>
          </div>
        </main>


      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
          
          {/* Weather Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigateTo("/weather")}
          >
            <div className="bg-yellow-500 text-white rounded-full p-6 mb-4">
              <Cloud size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Weather
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Current Conditions</p>
            <ArrowRight className="mt-4 text-yellow-500" size={24} />
          </div>

          {/* News Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigateTo("/news")}
          >
            <div className="bg-blue-500 text-white rounded-full p-6 mb-4">
              <Newspaper size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              News
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Latest Updates</p>
            <ArrowRight className="mt-4 text-blue-500" size={24} />
          </div>


          {/* Finance Card */}
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigateTo("/finance")}
          >
            <div className="bg-green-500 text-white rounded-full p-6 mb-4">
              <DollarSign size={24} />
            </div>
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Finance
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">Financial Overview</p>
            <ArrowRight className="mt-4 text-green-500" size={24} />
          </div>
        </div>
    </DashboardLayout>
  );
}

