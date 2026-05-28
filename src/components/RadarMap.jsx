import React, { useState } from 'react';
import { Map, Droplets, Wind, Thermometer, Cloud, Compass } from 'lucide-react';

const RadarMap = ({ location }) => {
  const [overlay, setOverlay] = useState('rain');

  const overlays = [
    { id: 'rain', icon: <Droplets size={16} />, label: 'Rain' },
    { id: 'wind', icon: <Wind size={16} />, label: 'Wind' },
    { id: 'temp', icon: <Thermometer size={16} />, label: 'Temperature' },
    { id: 'clouds', icon: <Cloud size={16} />, label: 'Clouds' },
    { id: 'pressure', icon: <Compass size={16} />, label: 'Pressure' }
  ];

  return (
    <section className="glass-panel animate-fade-in stagger-4" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          <Map size={20} /> Radar Map
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {overlays.map((layer) => (
            <button
              key={layer.id}
              onClick={() => setOverlay(layer.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem',
                borderRadius: '20px', border: '1px solid var(--glass-border)',
                background: overlay === layer.id ? '#3b82f6' : 'var(--glass-bg-hover)',
                color: overlay === layer.id ? '#ffffff' : 'var(--text-primary)',
                cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
            >
              {layer.icon} {layer.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ width: '100%', height: '350px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://embed.windy.com/embed2.html?lat=${location.lat}&lon=${location.lon}&detailLat=${location.lat}&detailLon=${location.lon}&zoom=5&level=surface&overlay=${overlay}&product=ecmwf&menu=&message=&marker=&calendar=now&city=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
          frameBorder="0" 
          style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
          title={`Interactive Weather Radar - ${overlay}`}
        ></iframe>
      </div>
    </section>
  );
};

export default RadarMap;
