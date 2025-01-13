import axios from 'axios';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
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