import React, { useState, useEffect } from 'react';
import { getFinance } from './lib/finance';

const FinancePage = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchFinance = async () => {
      const data = await getFinance('AAPL'); // Default stock symbol is 'AAPL'
      setStockData(data);
    };
    fetchFinance();
  }, []);

  return (
    <div>
      <h1>Finance</h1>
      <ul>
        {stockData.map((stock) => (
          <li key={stock.symbol}>
            {stock.symbol}: ${stock.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FinancePage;
