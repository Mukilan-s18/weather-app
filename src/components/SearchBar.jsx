import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Locate, Clock, X } from 'lucide-react';
import { searchCity } from '../services/weatherService';

const SearchBar = ({ onLocationSelect, setLoading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) setRecentSearches(JSON.parse(saved));

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2) {
      try {
        const results = await searchCity(value);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search failed", error);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(value.length === 0); // Show recent if empty
    }
  };

  const handleSelectCity = (city) => {
    const newLocation = {
      name: city.name,
      country: city.country,
      lat: city.latitude || city.lat,
      lon: city.longitude || city.lon
    };
    
    // Save to recents
    const updatedRecents = [newLocation, ...recentSearches.filter(c => c.name !== city.name)].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecents));
    
    onLocationSelect(newLocation);
    setSearchQuery('');
    setShowDropdown(false);
  };

  const handleRemoveRecent = (cityToRemove, e) => {
    e.stopPropagation();
    const updatedRecents = recentSearches.filter(c => c.name !== cityToRemove.name);
    setRecentSearches(updatedRecents);
    localStorage.setItem('recentSearches', JSON.stringify(updatedRecents));
  };

  const handleClearAllRecents = (e) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onLocationSelect({
            name: "Current Location",
            country: "Local",
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
          alert("Unable to retrieve your location. Please check browser permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        handleSelectCity(searchResults[0]);
      }
    }
  };

  return (
    <div className="search-container" ref={searchRef} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a city..." 
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
        />
        {showDropdown && (
          <ul className="search-results">
            {searchQuery.length > 2 && searchResults.length > 0 ? (
              searchResults.map((city) => (
                <li key={city.id} className="search-item" onMouseDown={() => handleSelectCity(city)}>
                  <MapPin size={16} className="text-secondary" />
                  <span className="city">{city.name}</span>
                  {city.admin1 && <span className="country">, {city.admin1}</span>}
                  <span className="country">({city.country})</span>
                </li>
              ))
            ) : recentSearches.length > 0 && searchQuery.length === 0 ? (
              <>
                <li style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Recent Searches</span>
                  <button type="button" onMouseDown={handleClearAllRecents} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', fontSize: '0.8rem', cursor: 'pointer', padding: '0.2rem' }}>Clear All</button>
                </li>
                {recentSearches.map((city, idx) => (
                  <li key={idx} className="search-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onMouseDown={() => handleSelectCity(city)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Clock size={16} className="text-secondary" />
                      <span className="city">{city.name}</span>
                      <span className="country">({city.country})</span>
                    </div>
                    <button type="button" onMouseDown={(e) => handleRemoveRecent(city, e)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.2rem', display: 'flex', alignItems: 'center' }} title="Remove from recents">
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </>
            ) : null}
          </ul>
        )}
      </div>
      <button 
        type="button"
        onClick={handleGetCurrentLocation}
        className="glass-panel"
        style={{ padding: '0.8rem', borderRadius: 'var(--glass-radius)', border: '1px solid var(--glass-border)', cursor: 'pointer', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--glass-bg-hover)' }}
        title="Use My Location"
      >
        <Locate size={20} />
      </button>
    </div>
  );
};

export default SearchBar;
