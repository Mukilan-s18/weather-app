import React from 'react';
import { AlertTriangle } from 'lucide-react';

const WeatherAlerts = ({ weatherData }) => {
  if (!weatherData) return null;

  const getAlert = () => {
    const wind = weatherData.current.wind_gusts_10m;
    const code = weatherData.current.weather_code;
    const temp = weatherData.current.temperature_2m;
    
    // Thunderstorm
    if ([95, 96, 99].includes(code)) return "⚠ Thunderstorm warning in effect for this area.";
    // Heavy Rain
    if ([65, 67, 82].includes(code)) return "⚠ Heavy rain alert. Possibility of localized flooding.";
    // Heavy Snow
    if ([75, 86].includes(code)) return "⚠ Heavy snow warning. Travel may be affected.";
    // Extreme Heat
    if (temp >= 35) return "⚠ Heatwave warning. Avoid prolonged sun exposure.";
    // Extreme Cold
    if (temp <= -10) return "⚠ Extreme cold warning. Risk of frostbite.";
    // High Winds
    if (wind > 60) return "⚠ High wind warning. Secure loose outdoor objects.";
    
    return null;
  };

  const alertMsg = getAlert();
  if (!alertMsg) return null;

  return (
    <div className="glass-panel animate-fade-in stagger-1" style={{ padding: '1rem 1.5rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', color: '#fca5a5' }}>
      <AlertTriangle size={24} />
      <span style={{ fontWeight: 600 }}>{alertMsg}</span>
    </div>
  );
};

export default WeatherAlerts;
