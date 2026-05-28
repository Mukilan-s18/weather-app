import React from 'react';
import { Leaf } from 'lucide-react';

const AirQualityCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.airQuality || !weatherData.airQuality.current) return null;
  
  const aqiData = weatherData.airQuality.current;
  const aqi = aqiData.us_aqi || 0;

  const getAQIStatus = (val) => {
    if(val <= 50) return { text: "Good", color: "#4ade80", max: 50 }; 
    if(val <= 100) return { text: "Moderate", color: "#facc15", max: 100 }; 
    if(val <= 150) return { text: "Unhealthy for Sensitive", color: "#fb923c", max: 150 }; 
    if(val <= 200) return { text: "Unhealthy", color: "#ef4444", max: 200 }; 
    if(val <= 300) return { text: "Very Unhealthy", color: "#a855f7", max: 300 }; 
    return { text: "Hazardous", color: "#9f1239", max: 500 }; 
  };

  const status = getAQIStatus(aqi);

  return (
    <section className="glass-panel animate-fade-in stagger-4 hover-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <Leaf size={20} style={{ color: status.color }} />
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Air Quality Index</h3>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', marginTop: '0.5rem', paddingBottom: '0.5rem' }}>
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '9rem', height: '9rem', borderRadius: '50%', border: `5px solid ${status.color}`, boxShadow: `0 0 15px ${status.color}33` }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>{aqi}</span>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: status.color, textAlign: 'center', marginTop: '0.2rem' }}>{status.text}</span>
        </div>
        
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '2rem' }}>
           <div className="aqi-metric">
             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>PM2.5</div>
             <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>{aqiData.pm2_5 || '--'}</div>
           </div>
           <div className="aqi-metric">
             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>PM10</div>
             <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>{aqiData.pm10 || '--'}</div>
           </div>
           <div className="aqi-metric">
             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>NO₂</div>
             <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>{aqiData.nitrogen_dioxide || '--'}</div>
           </div>
           <div className="aqi-metric">
             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>O₃</div>
             <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>{aqiData.ozone || '--'}</div>
           </div>
           <div className="aqi-metric">
             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>CO</div>
             <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>{aqiData.carbon_monoxide || '--'}</div>
           </div>
           <div className="aqi-metric">
             <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>SO₂</div>
             <div style={{ fontWeight: 700, fontSize: '1.4rem' }}>{aqiData.sulphur_dioxide || '--'}</div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default AirQualityCard;
