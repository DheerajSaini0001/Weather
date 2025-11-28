import React from "react";
import CurrentLocation from "./currentLocation";
import Forcast from "./forcast";
import "./App.css";
// 1. Import the icons you need
import { Github, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";

function App() {
  const [weatherState, setWeatherState] = React.useState({
    condition: "Clear",
    isDay: true,
  });

  const handleWeatherUpdate = (condition, isDay) => {
    setWeatherState({ condition, isDay });
  };

  return (
    <div className={`app-container ${weatherState.condition.toLowerCase()} ${weatherState.isDay ? "day" : "night"}`}>
      <div className="main-content">
        {/* Left Panel: Current Location Weather */}
        <div className="left-panel">
          <main className="glass-card">
            <CurrentLocation onWeatherUpdate={handleWeatherUpdate} />
          </main>
        </div>

        {/* Right Panel: Search & Forecast */}
        <div className="right-panel">
          <Forcast onWeatherUpdate={handleWeatherUpdate} />
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer-info">
        <div className="dev-credits">
          <a
            href="https://github.com/DheerajSaini0001/Weather"
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            {/* 2. Replace <i> with the Icon Component */}
            <Github size={18} style={{ marginRight: "5px", verticalAlign: "middle" }} />
            Source Code
          </a>
          <span className="separator">|</span>
          Developed by{" "}
          <a
            target="_blank"
            href="https://www.linkedin.com/in/dheeraj-saini-6256902a9/"
            rel="noopener noreferrer"
            className="dev-name"
          >
            Dheeraj Saini
          </a>
        </div>

        {/* Social Media Icons */}
        <div className="social-container">
          <a
            href="https://www.facebook.com/saini.dheeraj.33"
            className="social-btn facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={24} />
          </a>

          <a
            href="https://www.linkedin.com/in/dheeraj-saini-6256902a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            className="social-btn linkedin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={24} />
          </a>

          <a
            href="https://www.instagram.com/_dheeraj._.saini_/"
            className="social-btn instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={24} />
          </a>

          <a
            href=" https://x.com/Dheerajsaini069?t=TwOL0GS-cDe_fiaAdpMCCA&s=08 "
            className="social-btn twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Lucide uses the standard bird for Twitter. 
                If you strictly want the 'X' shape, import { X } from 'lucide-react' instead. */}
            <Twitter size={24} />
          </a>
        </div>

        <p className="copyright">© {new Date().getFullYear()} Weather App</p>
      </footer>
    </div>
  );
}

export default App;