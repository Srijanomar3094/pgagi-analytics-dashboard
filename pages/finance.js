import React, { useState, useEffect } from 'react';
import { getFinance } from '../lib/finance'; // Ensure this supports fetching data for multiple stocks
import DashboardLayout from '@/components/DashboardLayout';

const FinancePage = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const symbols = ['AAPL', 'META', 'NFLX', 'GOOG'];
        // Use Promise.all to fetch data for each symbol and flatten the resulting array
        const data = await Promise.all(symbols.map(symbol => getFinance(symbol)));
        
        // Flatten the data array
        const flattenedData = data.flat();
        
        // Log the flattened data to check the structure
        console.log(flattenedData);

        setStockData(flattenedData);
      } catch (error) {
        console.error("Error fetching finance data:", error);
      }
    };
    fetchFinance();
  }, []);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          Finance Data
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stockData.map((stock, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stock.symbol}</h3>
              <p className="text-xl text-gray-700 dark:text-gray-300 mt-2">
                Price: <span className="text-green-500">${stock.price ? stock.price.toFixed(2) : 'N/A'}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Change: <span className={stock.change > 0 ? 'text-green-500' : 'text-red-500'}>
                  {stock.change !== undefined ? (stock.change > 0 ? `+${stock.change}` : stock.change) : 'N/A'}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Market Cap: ${stock.marketCap ? stock.marketCap.toLocaleString() : 'N/A'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancePage;
