import axios from 'axios';

const WEATHER_API_KEY = "a6a3c0821966465bb5025701262804";

// Get weather data from WeatherAPI for a given lat/lon
export const getWeather = async (lat, lon) => {
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=7&aqi=yes`;
  
  try {
    const response = await axios.get(forecastUrl);
    const data = response.data;
    
    // Map WeatherAPI to our existing Open-Meteo structure
    const allHours = data.forecast.forecastday.flatMap(d => d.hour);
    
    const mappedData = {
      timezone: data.location.tz_id,
      current: {
        time: data.current.last_updated_epoch,
        temperature_2m: data.current.temp_c,
        relative_humidity_2m: data.current.humidity,
        apparent_temperature: data.current.feelslike_c,
        is_day: data.current.is_day,
        precipitation: data.current.precip_mm,
        weather_code: data.current.condition.code,
        cloud_cover: data.current.cloud,
        pressure_msl: data.current.pressure_mb,
        wind_speed_10m: data.current.wind_kph,
        wind_direction_10m: data.current.wind_degree,
        wind_gusts_10m: data.current.gust_kph,
        uv_index: data.current.uv
      },
      daily: {
        time: data.forecast.forecastday.map(d => d.date_epoch),
        weather_code: data.forecast.forecastday.map(d => d.day.condition.code),
        temperature_2m_max: data.forecast.forecastday.map(d => d.day.maxtemp_c),
        temperature_2m_min: data.forecast.forecastday.map(d => d.day.mintemp_c),
        sunrise: data.forecast.forecastday.map(d => Math.floor(new Date(`${d.date} ${d.astro.sunrise}`).getTime() / 1000)),
        sunset: data.forecast.forecastday.map(d => Math.floor(new Date(`${d.date} ${d.astro.sunset}`).getTime() / 1000)),
        precipitation_sum: data.forecast.forecastday.map(d => d.day.totalprecip_mm),
        precipitation_probability_max: data.forecast.forecastday.map(d => d.day.daily_chance_of_rain)
      },
      hourly: {
        time: allHours.map(h => h.time_epoch),
        temperature_2m: allHours.map(h => h.temp_c),
        precipitation_probability: allHours.map(h => h.chance_of_rain),
        weather_code: allHours.map(h => h.condition.code),
        wind_speed_10m: allHours.map(h => h.wind_kph),
        uv_index: allHours.map(h => h.uv)
      },
      airQuality: {
        current: {
          us_aqi: data.current.air_quality["us-epa-index"] * 30, // rough mapping to 0-500 scale
          pm10: data.current.air_quality.pm10,
          pm2_5: data.current.air_quality.pm2_5
        }
      }
    };
    
    return mappedData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Search for a city using Open-Meteo Geocoding
export const searchCity = async (query) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  try {
    const response = await axios.get(url);
    return response.data.results || [];
  } catch (error) {
    console.error("Error searching city:", error);
    throw error;
  }
};

// Weather Code Mapping based on WeatherAPI descriptions
export const getWeatherCondition = (code, isDay = 1) => {
  const isNight = isDay === 0;
  
  const codeMap = {
    1000: { text: "Clear", icon: isDay ? "sun" : "moon", theme: isNight ? "night" : "clear-day" },
    1003: { text: "Partly Cloudy", icon: isDay ? "cloud-sun" : "cloud-moon", theme: isNight ? "night" : "cloudy" },
    1006: { text: "Cloudy", icon: "cloud", theme: "cloudy" },
    1009: { text: "Overcast", icon: "cloud", theme: "cloudy" },
    1030: { text: "Mist", icon: "cloud-fog", theme: "cloudy" },
    1063: { text: "Patchy Rain", icon: "cloud-rain", theme: "rain" },
    1066: { text: "Patchy Snow", icon: "cloud-snow", theme: "snow" },
    1069: { text: "Patchy Sleet", icon: "cloud-snow", theme: "snow" },
    1072: { text: "Patchy Freezing Drizzle", icon: "cloud-rain", theme: "rain" },
    1087: { text: "Thundery Outbreaks", icon: "cloud-lightning", theme: "thunderstorm" },
    1114: { text: "Blowing Snow", icon: "cloud-snow", theme: "snow" },
    1117: { text: "Blizzard", icon: "cloud-snow", theme: "snow" },
    1135: { text: "Fog", icon: "cloud-fog", theme: "cloudy" },
    1148: { text: "Freezing Fog", icon: "cloud-fog", theme: "cloudy" },
    1150: { text: "Patchy Light Drizzle", icon: "cloud-rain", theme: "rain" },
    1153: { text: "Light Drizzle", icon: "cloud-rain", theme: "rain" },
    1168: { text: "Freezing Drizzle", icon: "cloud-rain", theme: "rain" },
    1171: { text: "Heavy Freezing Drizzle", icon: "cloud-rain", theme: "rain" },
    1180: { text: "Patchy Light Rain", icon: "cloud-rain", theme: "rain" },
    1183: { text: "Light Rain", icon: "cloud-rain", theme: "rain" },
    1186: { text: "Moderate Rain at times", icon: "cloud-rain", theme: "rain" },
    1189: { text: "Moderate Rain", icon: "cloud-rain", theme: "rain" },
    1192: { text: "Heavy Rain at times", icon: "cloud-rain", theme: "rain" },
    1195: { text: "Heavy Rain", icon: "cloud-rain", theme: "rain" },
    1198: { text: "Light Freezing Rain", icon: "cloud-rain", theme: "rain" },
    1201: { text: "Heavy Freezing Rain", icon: "cloud-rain", theme: "rain" },
    1204: { text: "Light Sleet", icon: "cloud-snow", theme: "snow" },
    1207: { text: "Heavy Sleet", icon: "cloud-snow", theme: "snow" },
    1210: { text: "Patchy Light Snow", icon: "cloud-snow", theme: "snow" },
    1213: { text: "Light Snow", icon: "cloud-snow", theme: "snow" },
    1216: { text: "Patchy Moderate Snow", icon: "cloud-snow", theme: "snow" },
    1219: { text: "Moderate Snow", icon: "cloud-snow", theme: "snow" },
    1222: { text: "Patchy Heavy Snow", icon: "cloud-snow", theme: "snow" },
    1225: { text: "Heavy Snow", icon: "cloud-snow", theme: "snow" },
    1237: { text: "Ice Pellets", icon: "cloud-snow", theme: "snow" },
    1240: { text: "Light Rain Shower", icon: "cloud-rain", theme: "rain" },
    1243: { text: "Heavy Rain Shower", icon: "cloud-rain", theme: "rain" },
    1246: { text: "Torrential Rain Shower", icon: "cloud-rain", theme: "rain" },
    1249: { text: "Light Sleet Showers", icon: "cloud-snow", theme: "snow" },
    1252: { text: "Heavy Sleet Showers", icon: "cloud-snow", theme: "snow" },
    1255: { text: "Light Snow Showers", icon: "cloud-snow", theme: "snow" },
    1258: { text: "Heavy Snow Showers", icon: "cloud-snow", theme: "snow" },
    1261: { text: "Light Showers of Ice Pellets", icon: "cloud-snow", theme: "snow" },
    1264: { text: "Heavy Showers of Ice Pellets", icon: "cloud-snow", theme: "snow" },
    1273: { text: "Light Rain with Thunder", icon: "cloud-lightning", theme: "thunderstorm" },
    1276: { text: "Heavy Rain with Thunder", icon: "cloud-lightning", theme: "thunderstorm" },
    1279: { text: "Light Snow with Thunder", icon: "cloud-lightning", theme: "thunderstorm" },
    1282: { text: "Heavy Snow with Thunder", icon: "cloud-lightning", theme: "thunderstorm" }
  };
  
  let mapped = codeMap[code] || { text: "Unknown", icon: "cloud", theme: "cloudy" };
  if (!isDay && mapped.theme !== "thunderstorm" && mapped.theme !== "rain" && mapped.theme !== "snow") {
    mapped.theme = "night";
  }
  return mapped;
};
