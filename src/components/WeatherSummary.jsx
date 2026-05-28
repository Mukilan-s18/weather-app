import React from 'react';
import { Sparkles } from 'lucide-react';
import { getWeatherCondition } from '../services/weatherService';

const WeatherSummary = ({ weatherData }) => {
  if (!weatherData) return null;

  const generateInsight = (weather) => {
    const nextHourPrecip = weather.hourly.precipitation_probability[1] || 0;
    const isRainingNow = weather.current.precipitation > 0;
    const condition = getWeatherCondition(weather.current.weather_code, weather.current.is_day).text.toLowerCase();
    
    if (isRainingNow) return "It's currently raining. Expect conditions to continue changing over the next few hours.";
    if (nextHourPrecip > 30) return `High chance of rain (${nextHourPrecip}%) expected in the coming hour. Keep an umbrella handy.`;
    if (weather.current.uv_index > 7) return `UV index is currently ${weather.current.uv_index} (Very High). Make sure to wear sunscreen!`;
    const maxTemp = weather.daily.temperature_2m_max[0];
    if (maxTemp > 30) return "It's going to be a hot day. Remember to stay hydrated out there.";
    if (weather.current.wind_speed_10m > 25) return "It is quite windy right now. Expect stronger gusts.";
    
    return `Expect mostly ${condition} conditions today. ${weather.current.relative_humidity_2m > 70 ? 'It will feel quite humid.' : ''}`;
  };

  return (
    <section className="glass-panel animate-fade-in stagger-2" style={{ padding: '1.2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '-1rem' }}>
      <Sparkles size={24} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
      <span style={{ fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.4 }}>{generateInsight(weatherData)}</span>
    </section>
  );
};

export default WeatherSummary;
