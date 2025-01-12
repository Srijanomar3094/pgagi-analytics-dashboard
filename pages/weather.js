import React, { useState, useEffect } from 'react';
import { getWeather } from './lib/weather';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather('New York'); // Default city is 'New York'
      setWeather(data);
    };
    fetchWeather();
  }, []);

  return (
    <div>
      <h1>Weather</h1>
      {weather ? (
        <div>
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherPage;
