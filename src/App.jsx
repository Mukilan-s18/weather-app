import React, { useState, useEffect } from 'react';
import './App.css';
import { getWeather, getWeatherCondition } from './services/weatherService';
import { WeatherIcon } from './components/WeatherIcon';
import SearchBar from './components/SearchBar';
import UnitToggle from './components/UnitToggle';
import MainWeatherCard from './components/MainWeatherCard';
import WeatherSummary from './components/WeatherSummary';
import WeatherAlerts from './components/WeatherAlerts';
import HourlyForecast from './components/HourlyForecast';
import WeeklyForecast from './components/WeeklyForecast';
import WeatherHighlights from './components/WeatherHighlights';
import AirQualityCard from './components/AirQualityCard';
import SunTimeline from './components/SunTimeline';
import RadarMap from './components/RadarMap';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState({ temp: 'C', speed: 'km/h' });
  const [location, setLocation] = useState({
    name: "Chennai", country: "India", lat: 13.0827, lon: 80.2707
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getWeather(location.lat, location.lon);
      setWeatherData(data);
      const condition = getWeatherCondition(data.current.weather_code, data.current.is_day);
      document.documentElement.setAttribute('data-theme', condition.theme);
    } catch (error) {
      console.error("Failed to load weather data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [location]);

  if (loading && !weatherData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your skies...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="animate-fade-in stagger-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 50 }}>
        <div className="brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <WeatherIcon name="cloud-sun" size={32} className="text-primary" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>AeroWeather</h1>
        </div>
        <div style={{ flex: 1, maxWidth: '500px' }}>
          <SearchBar onLocationSelect={setLocation} setLoading={setLoading} />
        </div>
        <UnitToggle units={units} setUnits={setUnits} />
      </header>

      {weatherData && (
        <div className="dashboard">
          <div className="main-left" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minWidth: 0 }}>
            <WeatherAlerts weatherData={weatherData} />
            <MainWeatherCard weatherData={weatherData} location={location} units={units} />
            <WeatherSummary weatherData={weatherData} />
            <HourlyForecast weatherData={weatherData} units={units} />
            <AirQualityCard weatherData={weatherData} />
            <RadarMap location={location} />
          </div>

          <div className="sidebar-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <WeeklyForecast weatherData={weatherData} units={units} />
            <SunTimeline weatherData={weatherData} />
            <WeatherHighlights weatherData={weatherData} units={units} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
