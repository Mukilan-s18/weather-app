import React from 'react';
import { Wind, Droplets } from 'lucide-react';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherCondition } from '../services/weatherService';

const HourlyForecast = ({ weatherData, units }) => {
  const [nowLimit] = React.useState(() => Date.now() - 3600000);

  if (!weatherData) return null;

  return (
    <section className="glass-panel animate-fade-in stagger-3" style={{ padding: '1.5rem' }}>
      <h3 className="section-title">
        <Wind size={20} /> Next 24 Hours
      </h3>
      <div className="hourly-container">
        {weatherData.hourly.time
          .map((time, index) => ({ time, index }))
          .filter(item => item.time * 1000 > nowLimit) // Keep current hour and future hours
          .slice(0, 24)
          .map((item, mappedIndex) => {
            const { time, index } = item;
            const hourDate = new Date(time * 1000);
            const isNow = mappedIndex === 0;
            const hourCondition = getWeatherCondition(weatherData.hourly.weather_code[index], 1); 
            const formatter = new Intl.DateTimeFormat([], { timeZone: weatherData.timezone, hour: '2-digit', minute: '2-digit' });
            
            let temp = weatherData.hourly.temperature_2m[index];
            if (units.temp === 'F') temp = temp * 9/5 + 32;
            
            return (
              <div key={time} className="hourly-item glass-panel hover-card">
                <span className="hourly-time">
                  {isNow ? 'Now' : formatter.format(hourDate)}
                </span>
                <WeatherIcon name={hourCondition.icon} size={28} />
                <span className="hourly-temp">{Math.round(temp)}°</span>
                {weatherData.hourly.precipitation_probability[index] > 0 && (
                  <span style={{ fontSize: '0.75rem', color: '#60a5fa', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px', marginTop: '-0.3rem' }}>
                    <Droplets size={10} /> {weatherData.hourly.precipitation_probability[index]}%
                  </span>
                )}
              </div>
            );
        })}
      </div>
    </section>
  );
};

export default HourlyForecast;
