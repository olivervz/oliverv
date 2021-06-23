import React from "react";
import styled from "styled-components";
import Projects from "../Projects";

const PortfolioContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
const HeaderStyle = styled.h1`
  text-align: center;
  padding-top: 75px;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: max(20px, 2.5vw);
  line-height: 59px;

  color: #a7c0bc;
`;

const Portfolio = () => {
  return (
    <PortfolioContainer>
      <HeaderStyle data-aos="zoom-in" data-aos-duration="100000">
        Some Projects I've Done
      </HeaderStyle>
      <Projects />
    </PortfolioContainer>
  );
};

export default Portfolio;
