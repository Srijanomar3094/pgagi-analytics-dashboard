import axios from 'axios';

const NEWS_API_KEY = 'c3a6c2a547f54f6dbaaf2e49394f2705';
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines';

export const getNews = async (country = 'us') => {
  const response = await axios.get(NEWS_API_URL, {
    params: {
      country: country,
      apiKey: NEWS_API_KEY
    }
  });
  return response.data.articles;
};