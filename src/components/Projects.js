import React from "react";
import Project from "./Project";
import styled from "styled-components";
import { useState, useEffect } from "react";

const ProjectTableStyle = styled.table`
  margin-left: auto;
  margin-right: auto;
  border-spacing: 25px;
`;
const TableContainerStyle = styled.div`
  position: relative;
  top: 5%;
  background: #3b5954;
`;

const TableItemStyle = styled.td``;

const TableRowStyle = styled.tr`
  content-align: center;
`;

const Projects = () => {
  const SpotifyProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Spotify Playlist App"
      description="Built a web app that allows users to generate fully random playlists that can be uploaded directly to their Spotify accounts.  "
      technologies="React &nbsp;&nbsp;&nbsp; Node.js &nbsp;&nbsp;&nbsp; Spotify API &nbsp;&nbsp;&nbsp; OAuth "
      githublink="https://github.com/olivervz/Spotify-Playlist-App"
      link={null}
    />
  );
  const PortfolioProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Personal Website"
      description="My first crack at making a portfolio website from scratch. Also my first time using Figma."
      technologies="React &nbsp;&nbsp;&nbsp; Firebase &nbsp;&nbsp;&nbsp; Figma"
      githublink="https://github.com/olivervz/oliverv"
      link="https://oliverv.firebaseapp.com"
    />
  );
  const WeatherProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Feels Like"
      description="A simple weather web app that displays weather information.  Uses the OpenWeather API for weather data, and the HERE Geocoder API to generate latitude and longitude coordinates from user input."
      technologies="React &nbsp;&nbsp;&nbsp; Firebase"
      githublink="https://github.com/olivervz/feels-like"
      link="https://feels-like.firebaseapp.com"
    />
  );
  const PneumoniaProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Pneumonia CNN"
      description="Artificial Intelligence term project.  Built a Convolutional Neural Network to identify the presence of Bacterial and Viral Pneumonia in chest X-rays."
      technologies="Python &nbsp;&nbsp;&nbsp; Keras"
      githublink="https://github.com/olivervz/Pneumonia-Neural-Network"
      link="/documents/Pneumonia.pdf"
    />
  );
  const GreenswitchProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Greenswitch"
      description="NASA Space Apps 2019 Hackathon Project.  Flask app that uses NASA APIs to provide the user with the optimal alternative energy option for their latitude and longitude"
      technologies="Python &nbsp;&nbsp;&nbsp; Flask"
      githublink="https://github.com/olivervz/Greenswitch"
      link={null}
    />
  );
  const TaskTrackerProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Task Tracker"
      description="Chronological Task Tracker which allows users to log in and add, delete and update their tasks.  Front-end built using React and deployed on Firebase, back-end built using Node.js, Express, and MySQL, and deployed using Heroku"
      technologies="React &nbsp;&nbsp;&nbsp; Node &nbsp;&nbsp;&nbsp; Express &nbsp;&nbsp;&nbsp; MySQL &nbsp;&nbsp;&nbsp; Firebase &nbsp;&nbsp;&nbsp; Heroku"
      githublink="https://github.com/olivervz/task-tracker-app"
      link={"https://task-list-tracker.web.app/"}
    />
  );
  const projectAOSData = "zoom-in-up";
  const projectAOSDuration = "1000";
  const projectAOSDurationMiddle = "10000";
  const projectAOSDurationBottom = "100000";
  const DesktopView = (
    <TableContainerStyle>
      <ProjectTableStyle>
        <TableRowStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDuration}
          >
            {SpotifyProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDuration}
          >
            {TaskTrackerProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDuration}
          >
            {PortfolioProject}
          </TableItemStyle>
        </TableRowStyle>
        <TableRowStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationMiddle}
          >
            {WeatherProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationMiddle}
          >
            {PneumoniaProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationMiddle}
          >
            {GreenswitchProject}
          </TableItemStyle>
        </TableRowStyle>
      </ProjectTableStyle>
    </TableContainerStyle>
  );

  const MobileView = (
    <TableContainerStyle>
      <ProjectTableStyle>
        <TableRowStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDuration}
          >
            {SpotifyProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationMiddle}
          >
            {TaskTrackerProject}
          </TableItemStyle>
        </TableRowStyle>
        <TableRowStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDuration}
          >
            {PortfolioProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationMiddle}
          >
            {PneumoniaProject}
          </TableItemStyle>
        </TableRowStyle>
        <TableRowStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationMiddle}
          >
            {WeatherProject}
          </TableItemStyle>
          <TableItemStyle
            data-aos={projectAOSData}
            data-aos-duration={projectAOSDurationBottom}
          >
            {GreenswitchProject}
          </TableItemStyle>
        </TableRowStyle>
      </ProjectTableStyle>
    </TableContainerStyle>
  );

  const [desktopViewState, setDesktopViewState] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 875) {
        setDesktopViewState(false);
      } else {
        setDesktopViewState(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return <>{desktopViewState ? DesktopView : MobileView}</>;
};

export default Projects;
