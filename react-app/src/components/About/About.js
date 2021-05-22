import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import WebIcon from "@material-ui/icons/Web";

import "./About.css";

function About() {
  return (
    <div className="about_container">
      <style type="text/css">{`.left_navbar {display: none}`}</style>
      <div className="about_box">
        <span></span>
        <div className="about_content">
          <div>
            <h1>Jairo Calderon</h1>
          </div>
          <div className="about_icons">
            <GitHubIcon />
            <LinkedInIcon />
            <WebIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
