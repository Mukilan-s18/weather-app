import React from 'react';
import { Thermometer, Wind, Droplets, Eye, Compass, SunDim, Cloud, Umbrella } from 'lucide-react';

const WeatherHighlights = ({ weatherData, units }) => {
  if (!weatherData) return null;

  let feelsLike = weatherData.current.apparent_temperature;
  let windSpeed = weatherData.current.wind_speed_10m;
  let windGust = weatherData.current.wind_gusts_10m;
  
  if (units.temp === 'F') feelsLike = feelsLike * 9/5 + 32;
  if (units.speed === 'mph') {
    windSpeed = windSpeed * 0.621371;
    windGust = windGust * 0.621371;
  }

  const getUVStatus = (uv) => {
     if(uv <= 2) return "Low";
     if(uv <= 5) return "Moderate";
     if(uv <= 7) return "High";
     if(uv <= 10) return "Very High";
     return "Extreme";
  };

  return (
    <section className="details-grid animate-fade-in stagger-4">
      <div className="detail-card glass-panel hover-card" title="Feels like temperature based on wind and humidity">
        <div className="detail-header">
          <Thermometer size={18} /> Feels Like
        </div>
        <div className="detail-value">{Math.round(feelsLike)}°{units.temp}</div>
        <div className="detail-desc">
          {weatherData.current.apparent_temperature > weatherData.current.temperature_2m + 2 
            ? "Humidity makes it feel warmer" 
            : weatherData.current.apparent_temperature < weatherData.current.temperature_2m - 2
            ? "Wind makes it feel colder"
            : "Similar to actual temp"}
        </div>
      </div>
      
      <div className="detail-card glass-panel hover-card" title="Current wind speed and direction">
        <div className="detail-header">
          <Wind size={18} /> Wind
        </div>
        <div className="detail-value">{Math.round(windSpeed)} {units.speed}</div>
        <div className="detail-desc">Direction: {weatherData.current.wind_direction_10m}°</div>
      </div>

      <div className="detail-card glass-panel hover-card" title="Relative humidity percentage">
        <div className="detail-header">
          <Droplets size={18} style={{color: '#60a5fa'}} /> Humidity
        </div>
        <div className="detail-value">{weatherData.current.relative_humidity_2m}%</div>
        <div className="detail-desc">The dew point is {Math.round(weatherData.current.temperature_2m - ((100 - weatherData.current.relative_humidity_2m)/5))}°C</div>
        <div className="progress-bar-container">
           <div className="progress-bar-fill" style={{ width: `${weatherData.current.relative_humidity_2m}%`, background: 'linear-gradient(90deg, #60a5fa, #3b82f6)' }}></div>
        </div>
      </div>

      <div className="detail-card glass-panel hover-card" title="Visibility distance">
        <div className="detail-header">
          <Eye size={18} /> Visiblity
        </div>
        <div className="detail-value">{(10 - (weatherData.current.cloud_cover / 10)).toFixed(1)} km</div>
        <div className="detail-desc">
          {(10 - (weatherData.current.cloud_cover / 10)) > 8 ? "Perfectly clear view" : "Slightly hazy conditions"}
        </div>
      </div>

      <div className="detail-card glass-panel hover-card" title="Atmospheric pressure at sea level">
        <div className="detail-header">
          <Compass size={18} /> Pressure
        </div>
        <div className="detail-value">{Math.round(weatherData.current.pressure_msl)} hPa</div>
        <div className="detail-desc">
          {weatherData.current.pressure_msl > 1013 ? 'High pressure (fair weather)' : 'Low pressure (cloudy/rainy)'}
        </div>
      </div>

      <div className="detail-card glass-panel hover-card" title="UV Index rating">
        <div className="detail-header">
          <SunDim size={18} style={{color: '#facc15'}} /> UV Index
        </div>
        <div className="detail-value">{Math.round(weatherData.current.uv_index || 0)}</div>
        <div className="detail-desc">{getUVStatus(weatherData.current.uv_index || 0)}</div>
        <div className="progress-bar-container">
           <div className="progress-bar-fill" style={{ width: `${Math.min(((weatherData.current.uv_index || 0)/12)*100, 100)}%`, background: 'linear-gradient(90deg, #4ade80, #facc15, #ef4444)' }}></div>
        </div>
      </div>

      <div className="detail-card glass-panel hover-card" title="Maximum wind gust speed">
        <div className="detail-header">
          <Wind size={18} style={{color: '#cbd5e1'}} /> Wind Gusts
        </div>
        <div className="detail-value">{Math.round(windGust)} {units.speed}</div>
        <div className="detail-desc">
          {weatherData.current.wind_gusts_10m > 40 ? 'High gust speeds' : 'Normal gust variations'}
        </div>
      </div>

      <div className="detail-card glass-panel hover-card" title="Percentage of sky covered by clouds">
        <div className="detail-header">
          <span style={{ fontSize: '1.2rem', lineHeight: 1, textShadow: 'none', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>☁️</span> Cloud Cover
        </div>
        <div className="detail-value">{weatherData.current.cloud_cover}%</div>
        <div className="detail-desc">
          {weatherData.current.cloud_cover > 50 ? 'Mostly cloudy skies' : 'Mostly clear skies'}
        </div>
        <div className="progress-bar-container">
           <div className="progress-bar-fill" style={{ width: `${weatherData.current.cloud_cover}%`, background: '#94a3b8' }}></div>
        </div>
      </div>

      <div className="detail-card glass-panel hover-card" title="Amount of rain/snow today" style={{ gridColumn: '1 / -1', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="detail-header">
            <Umbrella size={18} style={{color: '#38bdf8'}} /> Rainfall
          </div>
          <div className="detail-desc" style={{ marginTop: '0.5rem' }}>
            {weatherData.daily.precipitation_probability_max[0]}% chance of rain today
          </div>
        </div>
        <div className="detail-value" style={{ fontSize: '2rem' }}>{weatherData.current.precipitation} mm</div>
      </div>
    </section>
  );
};

export default WeatherHighlights;
