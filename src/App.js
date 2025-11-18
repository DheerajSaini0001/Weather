import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";


function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"  />
      </div>
      <div className="footer-info">
        <a href="https://github.com/DheerajSaini0001/Weather">
          Source Code
        </a>{" "}
        | Developed by{" "}
        <a target="_blank" href="https://www.linkedin.com/in/dheeraj-saini-6256902a9/">
          Dheeraj Saini
        </a>{" "}
       <br/>
       <br/>
        <div className="socialm">
    <a href="https://www.facebook.com/saini.dheeraj.33" class="Socialfb "><i class="fa-brands fa-facebook-f"></i></a>
    <a href="https://www.linkedin.com/in/dheeraj-saini-6256902a9?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" class="Sociallinkedin "><i class="fa-brands fa-linkedin"></i></a>
    <a href="https://www.instagram.com/_dheeraj._.saini_/" class="Socialinstagram "><i class="fa-brands fa-instagram"></i></a>
    <a href=" https://x.com/Dheerajsaini069?t=TwOL0GS-cDe_fiaAdpMCCA&s=08 " class="Socialtwitter "><i class="fa-brands fa-twitter"></i></a>
    </div>
      </div>
    </React.Fragment>
  );
}

export default App;
