import React, { useState, useEffect } from 'react';
import { getNews } from '../lib/news';
import DashboardLayout from '@/components/DashboardLayout';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews(); 
      setArticles(data);
    };
    fetchNews();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Latest News
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
              <img 
                src={article.urlToImage || '/default-image.jpg'} 
                alt={article.title} 
                className="w-full h-48 object-cover rounded-t-lg" 
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-blue-600 hover:underline">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewsPage;
