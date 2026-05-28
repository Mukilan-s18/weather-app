import React from 'react';
import { WeatherIcon } from './WeatherIcon';
import { getWeatherCondition } from '../services/weatherService';

const WeeklyForecast = ({ weatherData, units }) => {
  if (!weatherData) return null;

  let weekMinRaw = Math.min(...weatherData.daily.temperature_2m_min.slice(0, 7));
  let weekMaxRaw = Math.max(...weatherData.daily.temperature_2m_max.slice(0, 7));
  
  if (units.temp === 'F') {
    weekMinRaw = weekMinRaw * 9/5 + 32;
    weekMaxRaw = weekMaxRaw * 9/5 + 32;
  }
  
  const safeRange = (weekMaxRaw - weekMinRaw) === 0 ? 1 : (weekMaxRaw - weekMinRaw);

  return (
    <section className="glass-panel daily-forecast">
      <h3 className="section-title" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
        7-Day Forecast
      </h3>
      <div className="daily-list">
        {weatherData.daily.time.slice(0, 7).map((time, index) => {
          const date = new Date(time * 1000);
          const isToday = index === 0;
          const formatter = new Intl.DateTimeFormat([], { timeZone: weatherData.timezone, weekday: 'short' });
          const weekday = formatter.format(date);
          const dailyCond = getWeatherCondition(weatherData.daily.weather_code[index], 1);
          
          let min = weatherData.daily.temperature_2m_min[index];
          let max = weatherData.daily.temperature_2m_max[index];
          
          if (units.temp === 'F') {
            min = min * 9/5 + 32;
            max = max * 9/5 + 32;
          }
          
          const leftPercent = ((min - weekMinRaw) / safeRange) * 100;
          const widthPercent = ((max - min) / safeRange) * 100;

          return (
            <div key={time} className="daily-item hover-card" style={{ borderBottom: isToday ? '1px solid var(--glass-border)' : 'none', background: isToday ? 'var(--glass-bg-hover)' : 'transparent', padding: isToday ? '1rem' : '1rem 0', borderRadius: isToday ? '12px' : '0' }}>
              <div className="daily-day" style={{ minWidth: '55px', flex: 1, fontWeight: isToday ? 700 : 500 }}>{isToday ? 'Today' : weekday}</div>
              <div className="daily-icon" style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <WeatherIcon name={dailyCond.icon} size={24} />
              </div>
              <div className="daily-temp" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span className="temp-min" style={{ display: 'inline-block', width: '35px', textAlign: 'right', fontSize: '1rem' }}>{Math.round(min)}°</span>
                <div className="daily-temp-bar-container">
                   <div className="daily-temp-bar" style={{ left: `${leftPercent}%`, width: `${widthPercent}%` }}></div>
                </div>
                <span className="temp-max" style={{ display: 'inline-block', width: '35px', fontWeight: 700 }}>{Math.round(max)}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklyForecast;
