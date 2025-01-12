import React, { useState, useEffect } from "react";
import { getWeather } from "./lib/weather"; // Ensure this function supports fetching weather for a city
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import DashboardLayout from '@/components/DashboardLayout';

// Dynamically import 'antd' components with ssr: false
const Card = dynamic(() => import("antd/es/card"), { ssr: false });

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      const cities = ["New York", "London", "Delhi", "Mumbai", "Chennai", "Bangalore"]; // Add more cities as needed
      try {
        const data = await Promise.all(
          cities.map(city => getWeather(city)) // Ensure getWeather handles city names properly
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeather();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <DashboardLayout>
      <div className={`min-h-screen ${darkMode ? "dark" : ""} transition-all`}>
        <h1 className="text-3xl font-semibold text-center text-indigo-600 dark:text-indigo-400 mb-8">
          Weather Data
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {weatherData.length > 0 ? (
            weatherData.map((weather, index) => {
              const temperatureColor =
                weather.main.temp > 30 ? "text-red-500" : "text-blue-500"; // Color based on temperature
              const weatherConditionColor =
                weather.weather[0].description.includes("cloud")
                  ? "text-gray-500"
                  : "text-yellow-500"; // Color based on condition
              return (
                <motion.div
                  key={index}
                  className="transition-transform duration-300 hover:scale-105"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow"
                    hoverable
                  >
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Weather in {weather.name}
                    </h3>
                    <p className={`text-lg font-bold ${temperatureColor} mb-1`}>
                      <span className="font-semibold">Temperature:</span> {weather.main.temp}°C
                    </p>
                    <p className={`text-md ${weatherConditionColor} dark:text-gray-400`}>
                      <span className="font-semibold">Condition:</span> {weather.weather[0].description}
                    </p>
                  </Card>
                </motion.div>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Loading weather data...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WeatherPage;
