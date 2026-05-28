# AeroWeather – Premium Weather Dashboard

AeroWeather is a modern, responsive, and feature-rich weather dashboard built with React and Vite. It utilizes open-source APIs to fetch real-time weather information, hourly and weekly forecasts, air quality metrics, and radar visualization, presenting them in a premium glassmorphic user interface.

## Key Features

- **Real-Time Weather Details**: Key metrics such as current temperature, wind speed, relative humidity, UV index, visibility, and pressure.
- **Hourly Forecast**: Slideable 24-hour visual projection of temperature and conditions.
- **7-Day Forecast**: Weekly trend showing maximum and minimum temperatures with custom weather condition icons.
- **Weather Alerts**: Prominent warnings when severe weather conditions are detected.
- **Air Quality Index**: Evaluates and displays air quality levels (PM2.5, PM10, NO2, O3, SO2) with status classifications.
- **Sun Tracker**: Beautiful dynamic timeline showing sunrise, sunset, and solar progression.
- **Interactive Radar Map**: Interactive OpenStreetMap layer showing weather patterns based on coordinates.
- **Dynamic Theming**: The app's color palette adapts automatically based on the current weather condition (e.g. sunny, rainy, cloudy, night).
- **Unit Toggle**: Toggle between Celsius and Fahrenheit.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API Fetching**: Axios

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local URL (usually `http://localhost:5173`).

### Building for Production

To create an optimized production build:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```
