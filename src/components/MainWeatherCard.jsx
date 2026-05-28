import React from 'react';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherCondition } from '../services/weatherService';

const MainWeatherCard = ({ weatherData, location, units }) => {
  if (!weatherData) return null;

  const currentCondition = getWeatherCondition(weatherData.current.weather_code, weatherData.current.is_day);
  
  let temp = weatherData.current.temperature_2m;
  let high = weatherData.daily.temperature_2m_max[0];
  let low = weatherData.daily.temperature_2m_min[0];
  let feels = weatherData.current.apparent_temperature;
  
  if (units.temp === 'F') {
    temp = temp * 9/5 + 32;
    high = high * 9/5 + 32;
    low = low * 9/5 + 32;
    feels = feels * 9/5 + 32;
  }

  const updatedTime = new Date(weatherData.current.time * 1000);
  const diffMinutes = Math.floor((new Date() - updatedTime) / 60000);
  const updatedString = diffMinutes < 1 ? "Just now" : `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;

  return (
    <section className="current-weather glass-panel animate-fade-in stagger-2">
      <div className="current-info">
        <h2 className="location-name">{location.name}</h2>
        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Updated {updatedString}
        </div>
        
        <div className="temperature">
          {Math.round(temp)}°{units.temp}
        </div>
        
        <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', display: 'flex', gap: '1rem' }}>
          <span>H: {Math.round(high)}°</span>
          <span>L: {Math.round(low)}°</span>
        </div>
        
        <div className="condition" style={{ marginBottom: '0.5rem' }}>
          <WeatherIcon name={currentCondition.icon} size={28} />
          <span style={{ fontWeight: 600 }}>{currentCondition.text}</span>
        </div>
        
        <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
          Feels like {Math.round(feels)}°{units.temp}
        </div>
      </div>
      
      <div className="current-icon-lg animate-float">
        <WeatherIcon name={currentCondition.icon} size={160} />
      </div>
    </section>
  );
};

export default MainWeatherCard;
