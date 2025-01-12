import axios from 'axios';

const WEATHER_API_KEY = 'd84df071ad886a26e3f1aacb7bc8c2bd';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeather = async (city) => {
  const response = await axios.get(WEATHER_API_URL, {
    params: {
      q: city,
      appid: WEATHER_API_KEY,
      units: 'metric'
    }
  });
  return response.data;
};
