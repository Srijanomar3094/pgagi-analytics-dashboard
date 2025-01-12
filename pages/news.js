import React, { useState, useEffect } from 'react';
import { getNews } from './lib/news';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews(); // Fetch news for the US by default
      setArticles(data);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsPage;
