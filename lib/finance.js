import axios from 'axios';

const FINANCE_API_KEY = process.env.NEXT_PUBLIC_FINANCE_API_KEY;
const FINANCE_API_URL = 'https://financialmodelingprep.com/api/v3/quote';

export const getFinance = async (symbol) => {
  const response = await axios.get(`${FINANCE_API_URL}/${symbol}`, {
    params: {
      apikey: FINANCE_API_KEY
    }
  });
  return response.data;
};