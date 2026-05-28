import React from 'react';
import { 
  Search, Droplets, Wind, Thermometer, 
  Navigation, Umbrella, SunDim, MapPin, Cloud
} from 'lucide-react';

const uiIcons = {
  "search": Search,
  "droplets": Droplets,
  "wind": Wind,
  "thermometer": Thermometer,
  "navigation": Navigation,
  "umbrella": Umbrella,
  "sun-dim": SunDim,
  "map-pin": MapPin,
  "help-circle": Cloud
};

const weatherEmojis = {
  "sun": "☀️",
  "moon": "🌕",
  "cloud-sun": "⛅",
  "cloud-moon": "☁️",
  "cloud": "☁️",
  "cloud-fog": "🌫️",
  "cloud-drizzle": "🌦️",
  "cloud-rain": "🌧️",
  "cloud-snow": "❄️",
  "cloud-lightning": "⛈️",
  "cloud-showers-heavy": "🌧️"
};

export const WeatherIcon = ({ name, size = 24, className = "" }) => {
  // If it's a weather condition, render the hyper-realistic OS emoji
  if (weatherEmojis[name]) {
    return (
      <span 
        className={`weather-icon ${className}`} 
        style={{ 
          fontSize: `${size}px`, 
          lineHeight: 1, 
          display: 'inline-block',
          filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))',
          textShadow: 'none'
        }}
      >
        {weatherEmojis[name]}
      </span>
    );
  }

  // Fallback to Lucide line-art for UI elements (Search, Wind, etc.)
  const IconComponent = uiIcons[name] || uiIcons["help-circle"];
  return <IconComponent size={size} className={`weather-icon ${className}`} strokeWidth={1.5} />;
};
