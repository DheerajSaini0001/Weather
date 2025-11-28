import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";

function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city !== "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setError(""); // Clear previous errors
        const isDay = response.data.weather[0].icon.includes('d');
        if (props.onWeatherUpdate) {
          props.onWeatherUpdate(response.data.weather[0].main, isDay);
        }
      })
      .catch(function (error) {
        console.log(error);
        setWeather({});
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="forecast-card">

      {/* 1. Search Section */}
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={(e) => e.key === 'Enter' && search(query)}
        />
        <button className="search-btn" onClick={() => search(query)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {/* 2. Results Section */}
      {typeof weather.main !== "undefined" ? (
        <div className="results-container">

          {/* City Header */}
          <div className="city-header">
            <div className="city-info">
              <h3>{weather.name}, <span className="country-tag">{weather.sys.country}</span></h3>
              <p className="weather-desc">{weather.weather[0].main}</p>
            </div>
            <img
              className="weather-icon-small"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">

            <div className="stat-box">
              <i className="fa-solid fa-temperature-three-quarters"></i>
              <div>
                <span className="stat-label">Temp</span>
                <span className="stat-value">{Math.round(weather.main.temp)}°c</span>
              </div>
            </div>

            <div className="stat-box">
              <i className="fa-solid fa-droplet"></i>
              <div>
                <span className="stat-label">Humidity</span>
                <span className="stat-value">{Math.round(weather.main.humidity)}%</span>
              </div>
            </div>

            <div className="stat-box">
              <i className="fa-solid fa-eye"></i>
              <div>
                <span className="stat-label">Visibility</span>
                <span className="stat-value">{Math.round(weather.visibility / 1609)} mi</span>
              </div>
            </div>

            <div className="stat-box">
              <i className="fa-solid fa-wind"></i>
              <div>
                <span className="stat-label">Wind</span>
                <span className="stat-value">{Math.round(weather.wind.speed)} km/h</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="error-box">
          <h3>{error.query} {error.message}</h3>
        </div>
      )}
    </div>
  );
}

export default Forcast;