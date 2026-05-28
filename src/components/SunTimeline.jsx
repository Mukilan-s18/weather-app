import React from 'react';
import { Sunrise, Sunset } from 'lucide-react';

const SunTimeline = ({ weatherData }) => {
  if (!weatherData) return null;

  const sunrise = new Date(weatherData.daily.sunrise[0] * 1000);
  const sunset = new Date(weatherData.daily.sunset[0] * 1000);
  const now = new Date();
  
  const timeFormatter = new Intl.DateTimeFormat([], { timeZone: weatherData.timezone, hour: '2-digit', minute: '2-digit' });

  const totalDaylightMs = sunset.getTime() - sunrise.getTime();
  let progressMs = now.getTime() - sunrise.getTime();
  
  if (progressMs < 0) progressMs = 0;
  if (progressMs > totalDaylightMs) progressMs = totalDaylightMs;
  
  const progressPercent = (progressMs / totalDaylightMs) * 100;
  const isNight = now > sunset || now < sunrise;

  return (
    <section className="glass-panel" style={{ padding: '1.5rem 1.8rem' }}>
      <h3 className="section-title" style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)', fontSize: '1.4rem' }}>
        Sunrise & Sunset
      </h3>
      <div style={{ marginTop: '2rem' }}>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '10px', position: 'relative', marginBottom: '1.5rem', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${progressPercent}%`, background: isNight ? '#64748b' : 'linear-gradient(90deg, #facc15, #f97316)', borderRadius: '10px' }}></div>
          <div style={{ position: 'absolute', left: `${progressPercent}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 14px rgba(255,255,255,0.9)' }}></div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}><Sunrise size={20}/> Sunrise</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{timeFormatter.format(sunrise)}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', textShadow: '0 1px 2px rgba(0,0,0,0.4)' }}><Sunset size={20}/> Sunset</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{timeFormatter.format(sunset)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SunTimeline;
