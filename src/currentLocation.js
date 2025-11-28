import React from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";

import loader from "./images/WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";

const dateBuilder = (d) => {
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert("You have disabled location service.");
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
    });

    const currentTimestamp = new Date().getTime() / 1000;
    const isDay = currentTimestamp > data.sys.sunrise && currentTimestamp < data.sys.sunset;

    if (this.props.onWeatherUpdate) {
      this.props.onWeatherUpdate(data.weather[0].main, isDay);
    }

    // Icon Switch Logic
    switch (this.state.main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <div className="weather-content">

          {/* Header: Location */}
          <div className="weather-header">
            <h2 className="city-name">{this.state.city}</h2>
            <h3 className="country-name">{this.state.country}</h3>
          </div>

          {/* Body: Icon and Temp */}
          <div className="weather-body">
            <div className="icon-container">
              <ReactAnimatedWeather
                icon={this.state.icon}
                color={defaults.color}
                size={120}
                animate={defaults.animate}
              />
              <p className="weather-state">{this.state.main}</p>
            </div>

            <div className="temp-box">
              <h1 className="temperature">
                {this.state.temperatureC}°
              </h1>
            </div>
          </div>

          {/* Footer: Time and Date */}
          <div className="time-container">
            <div className="clock-box">
              <Clock format="HH:mm:ss" interval={1000} ticking={true} />
            </div>
            <div className="date-box">{dateBuilder(new Date())}</div>
          </div>


        </div>
      );
    } else {
      return (
        <div className="loading-container">
          <img src={loader} className="loader-img" alt="loading" />
          <h3 className="loading-text">Detecting your location</h3>
          <p className="loading-subtext">
            Your current location will be used for Real-time weather.
          </p>
        </div>
      );
    }
  }
}

export default Weather;