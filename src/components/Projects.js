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
      technologies="React Node.js Spotify API OAuth"
      link="https://github.com/olivervz/Spotify-Playlist-App"
    />
  );
  const PortfolioProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Personal Website"
      description="My first crack at making a portfolio website from scratch. Also my first time using Figma."
      technologies="React Firebase Figma"
      link="https://github.com/olivervz/oliverv"
    />
  );
  const WeatherProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Weather App"
      description="A simple weather web app that displays weather information.  Uses the OpenWeather API for weather data, and the HERE Geocoder API to generate latitude and longitude coordinates from user input."
      technologies="React Firebase"
      link="https://github.com/olivervz/feels-like"
    />
  );
  const PneumoniaProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Pneumonia CNN"
      description="Artificial Intelligence term project.  Built a Convolutional Neural Network to identify the presence of Bacterial and Viral Pneumonia in chest X-rays."
      technologies="Python Tensorflow"
      link="https://github.com/olivervz/Pneumonia-Neural-Network"
    />
  );
  const GreenswitchProject = (
    <Project
      style={{ display: "inline-block" }}
      title="Greenswitch"
      description="NASA Space Apps 2019 Hackathon Project.  Flask app that uses NASA APIs to provide the user with the optimal alternative energy option for their latitude and longitude"
      technologies="Python Flask"
      link="https://github.com/olivervz/Greenswitch"
    />
  );
  const DesktopView = (
    <TableContainerStyle>
      <ProjectTableStyle>
        <TableRowStyle>
          <TableItemStyle>{SpotifyProject}</TableItemStyle>
          <TableItemStyle>{PortfolioProject}</TableItemStyle>
          <TableItemStyle>{WeatherProject}</TableItemStyle>
        </TableRowStyle>
        <TableRowStyle>
          <TableItemStyle>{PneumoniaProject}</TableItemStyle>
          <TableItemStyle>{GreenswitchProject}</TableItemStyle>
        </TableRowStyle>
      </ProjectTableStyle>
    </TableContainerStyle>
  );

  const MobileView = (
    <TableContainerStyle>
      <ProjectTableStyle>
        <TableRowStyle>
          <TableItemStyle>{SpotifyProject}</TableItemStyle>
          <TableItemStyle>{PortfolioProject}</TableItemStyle>
        </TableRowStyle>
        <TableRowStyle>
          <TableItemStyle>{WeatherProject}</TableItemStyle>
          <TableItemStyle>{PneumoniaProject}</TableItemStyle>
        </TableRowStyle>
        <TableRowStyle>
          <TableItemStyle>{GreenswitchProject}</TableItemStyle>
        </TableRowStyle>
      </ProjectTableStyle>
    </TableContainerStyle>
  );

  const [desktopViewState, setDesktopViewState] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth < 850) {
        setDesktopViewState(false);
      } else {
        setDesktopViewState(true);
      }
    };
    window.addEventListener("resize", handleResize);
  });

  return <>{desktopViewState ? DesktopView : MobileView}</>;
};

export default Projects;