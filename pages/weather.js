import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { getWeather } from '../lib/weather';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [geolocationError, setGeolocationError] = useState('');
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [citySelected, setCitySelected] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = 'd84df071ad886a26e3f1aacb7bc8c2bd';
  const GEODB_API_KEY = 'eb7c794506msha9a8b1d7f228b4ep135bbejsn82c0a2198e87';

  const fetchCurrentWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setCurrentWeather(res.data);
      setCitySelected(true);
    } catch (err) {}
  };

  const fetchForecast = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`
      );
      setForecast(res.data.daily);
    } catch (err) {}
  };

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            setCurrentWeather(res.data);
            setCitySelected(true);
            fetchForecast({ lat: latitude, lon: longitude });
          } catch (err) {}
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
        const res = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
          {
            headers: {
              'X-RapidAPI-Key': GEODB_API_KEY,
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );
        setAutocompleteCities(res.data.data);
      } catch (err) {}
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const cities = ['New York', 'London', 'Delhi', 'Mumbai'];
      try {
        const data = await Promise.all(
          cities.map((city) => getWeather(city))
        );
        setWeatherData(data);
      } catch (error) {}
    };
    fetchWeather();
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
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-4 mt-4">Weather Information</h1>
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
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-800"
                >
                  {city.city}
                </li>
              ))}
            </ul>
          )}
        </div>
        {geolocationError && <p className="text-red-500 text-center mt-2">{geolocationError}</p>}
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
              <LineChart
                data={forecast.map((day) => ({
                  date: new Date(day.dt * 1000).toLocaleDateString(),
                  temp: day.temp.day,
                }))}
              >
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-20">
        {weatherData.length > 0 ? (
          weatherData.map((weather, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Weather in {weather.name}
              </h3>
              <p
                className={`text-lg font-bold ${
                  weather.main.temp > 30 ? 'text-red-500' : 'text-blue-500'
                } mb-1`}
              >
                Temperature: {weather.main.temp}°C
              </p>
              <p
                className={`text-md ${
                  weather.weather[0].description.includes('cloud')
                    ? 'text-gray-500'
                    : 'text-yellow-500'
                }`}
              >
                Condition: {weather.weather[0].description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Loading weather data...</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Weather;
