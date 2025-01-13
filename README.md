# PGAGI - Analytics Dashboard

This project is a dashboard built with [Next.js](https://nextjs.org) that displays live finance, weather, and news data for various stocks.

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>

2. Set Up Environment Variables

Create a .env.local file and add your API keys:

NEXT_PUBLIC_WEATHER_API_KEY=<your-weather-api-key>
NEXT_PUBLIC_FINANCE_API_KEY=<your-finance-api-key>
NEXT_PUBLIC_NEWS_API_KEY=<your-news-api-key>

3. Install Dependencies

npm install
# or
yarn install
# or
pnpm install

4. Run the Development Server

npm run dev
# or
yarn dev
# or
pnpm dev

Visit http://localhost:3000 to see the app.
Features

    Finance Data: Displays stock prices, market cap, and changes.
    Weather: Shows weather forecasts.
    News: Fetches the latest news articles.

API Routes

    /api/finance
    /api/weather
    /api/news

Deployment

Feel free to report issues or contribute via pull requests.