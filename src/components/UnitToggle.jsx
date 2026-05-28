import React from 'react';

const UnitToggle = ({ units, setUnits }) => {
  return (
    <div className="unit-toggle glass-panel" style={{ display: 'flex', borderRadius: '24px', overflow: 'hidden', width: 'fit-content', border: '1px solid var(--glass-border)' }}>
      <button 
        style={{ padding: '0.4rem 1rem', background: units.temp === 'C' ? 'var(--glass-bg-hover)' : 'transparent', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontWeight: units.temp === 'C' ? 700 : 400 }}
        onClick={() => setUnits({ temp: 'C', speed: 'km/h' })}
      >
        °C / km/h
      </button>
      <button 
        style={{ padding: '0.4rem 1rem', background: units.temp === 'F' ? 'var(--glass-bg-hover)' : 'transparent', color: 'var(--text-primary)', border: 'none', cursor: 'pointer', fontWeight: units.temp === 'F' ? 700 : 400 }}
        onClick={() => setUnits({ temp: 'F', speed: 'mph' })}
      >
        °F / mph
      </button>
    </div>
  );
};

export default UnitToggle;
