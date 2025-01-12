// import React, { useState, useEffect } from "react";
// import { getWeather } from "../lib/weather"; // Ensure this function supports fetching weather for a city
// import { motion } from "framer-motion";
// import dynamic from "next/dynamic";
// import DashboardLayout from '@/components/DashboardLayout';

// // Dynamically import 'antd' components with ssr: false
// const Card = dynamic(() => import("antd/es/card"), { ssr: false });

// const WeatherPage = () => {
//   const [weatherData, setWeatherData] = useState([]);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const fetchWeather = async () => {
//       const cities = ["New York", "London", "Delhi", "Mumbai", "Chennai", "Bangalore"]; // Add more cities as needed
//       try {
//         const data = await Promise.all(
//           cities.map(city => getWeather(city)) // Ensure getWeather handles city names properly
//         );
//         setWeatherData(data);
//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       }
//     };
//     fetchWeather();
//   }, []);

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   return (
//     <DashboardLayout>
//       <div className={`min-h-screen ${darkMode ? "dark" : ""} transition-all`}>
//         <h1 className="text-3xl font-semibold text-center text-indigo-600 dark:text-indigo-400 mb-8">
//           Weather Data
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
//           {weatherData.length > 0 ? (
//             weatherData.map((weather, index) => {
//               const temperatureColor =
//                 weather.main.temp > 30 ? "text-red-500" : "text-blue-500"; // Color based on temperature
//               const weatherConditionColor =
//                 weather.weather[0].description.includes("cloud")
//                   ? "text-gray-500"
//                   : "text-yellow-500"; // Color based on condition
//               return (
//                 <motion.div
//                   key={index}
//                   className="transition-transform duration-300 hover:scale-105"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Card
//                     className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow"
//                     hoverable
//                   >
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
//                       Weather in {weather.name}
//                     </h3>
//                     <p className={`text-lg font-bold ${temperatureColor} mb-1`}>
//                       <span className="font-semibold">Temperature:</span> {weather.main.temp}°C
//                     </p>
//                     <p className={`text-md ${weatherConditionColor} dark:text-gray-400`}>
//                       <span className="font-semibold">Condition:</span> {weather.weather[0].description}
//                     </p>
//                   </Card>
//                 </motion.div>
//               );
//             })
//           ) : (
//             <p className="text-gray-500 dark:text-gray-400">Loading weather data...</p>
//           )}
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default WeatherPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
// import WeatherPage from '@/components/CitiesWeather';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [geolocationError, setGeolocationError] = useState('');
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [citySelected, setCitySelected] = useState(false);
  
  const API_KEY = 'd84df071ad886a26e3f1aacb7bc8c2bd';  // Replace with your OpenWeatherMap API key
  const GEODB_API_KEY = 'eb7c794506msha9a8b1d7f228b4ep135bbejsn82c0a2198e87';  // Replace with your GeoDB Cities API key
  
  const fetchCurrentWeather = async (city) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setCurrentWeather(res.data);
      setCitySelected(true);
    } catch (err) {
      // setError('Failed to fetch weather data. Please try again later.');
    }
  };

  const fetchForecast = async (city) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`);
      setForecast(res.data.daily);
    } catch (err) {
      // setError('Failed to fetch weather forecast. Please try again later.');
    }
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
            setCurrentWeather(res.data);
            setCitySelected(true);
            fetchForecast({ lat: latitude, lon: longitude });
          } catch (err) {
            // setGeolocationError('Failed to fetch weather based on your location.');
          }
        },
        () => setGeolocationError('Geolocation permission denied.')
      );
    } else {
      setGeolocationError('Geolocation is not supported by this browser.');
    }
  };

  const fetchCitySuggestions = async (query) => {
    if (query) {
      try {
        const res = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, {
          headers: {
            'X-RapidAPI-Key': GEODB_API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          }
        });
        setAutocompleteCities(res.data.data);
      } catch (err) {
        setError('Failed to fetch city suggestions.');
      }
    }
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  const handleCitySearchChange = (event) => {
    setLocation(event.target.value);
    fetchCitySuggestions(event.target.value);
  };

  const handleCitySelect = (city) => {
    setLocation(city.name);
    fetchCurrentWeather(city.name);
    fetchForecast(city);
    setAutocompleteCities([]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4">Weather App</h1>

        <div className="relative">
          <input 
            type="text" 
            value={location}
            onChange={handleCitySearchChange}
            placeholder="Search city..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          />
          {autocompleteCities.length > 0 && (
            <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
              {autocompleteCities.map((city) => (
                <li 
                  key={city.id} 
                  onClick={() => handleCitySelect(city)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-800" // Dark text before selection
                >
                  {city.city}
                </li>
              ))}
            </ul>
          )}
        </div>

        {geolocationError && <p className="text-red-500 text-center mt-2">{geolocationError}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {currentWeather && (
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">{currentWeather.name}</h2>
            <p className="text-xl text-gray-700">Temperature: {currentWeather.main.temp}°C</p>
            <p className="text-lg text-gray-600">Humidity: {currentWeather.main.humidity}%</p>
            <p className="text-lg text-gray-600">Wind Speed: {currentWeather.wind.speed} m/s</p>
            <p className="text-lg text-gray-600">Weather: {currentWeather.weather[0].description}</p>
          </div>
        )}

        {forecast.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">7-Day Forecast</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forecast.map((day) => ({ date: new Date(day.dt * 1000).toLocaleDateString(), temp: day.temp.day }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
      {/* <WeatherPage/> */}
    </DashboardLayout>
  );
};

export default Weather;

