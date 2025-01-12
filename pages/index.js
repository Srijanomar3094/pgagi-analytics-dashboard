import { useEffect, useState } from 'react';
import { getWeather } from './lib/weather';
import { getFinance } from './lib/finance';
import { getNews } from './lib/news';
import DashboardLayout from '@/components/DashboardLayout'

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [finance, setFinance] = useState(null);
  const [news, setNews] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const weatherData = await getWeather('New York');
      setWeather(weatherData);

      const financeData = await getFinance('AAPL');
      setFinance(financeData);

      const newsData = await getNews();
      setNews(newsData);
    }

    fetchData();
  }, []);

  return (
    <DashboardLayout>
    <div>
      <h1>Weather, Finance, and News</h1>

      <section>
        <h2>Weather</h2>
        {weather && (
          <div>
            <p>City: {weather.name}</p>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Finance</h2>
        {finance && finance.length > 0 && (
          <div>
            <p>Symbol: {finance[0].symbol}</p>
            <p>Price: ${finance[0].price}</p>
          </div>
        )}
      </section>

      <section>
        <h2>News</h2>
        {news && news.length > 0 && (
          <ul>
            {news.map((article, index) => (
              <li key={index}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
    </DashboardLayout>
  );
  
}