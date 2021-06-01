import React from 'react'
import styled from 'styled-components'
import Projects from '../Projects'

const PortfolioContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

`
const HeaderStyle = styled.h1`
  text-align: center;
  top: 300px;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: max(20px, 2.5vw);
  line-height: 59px;

  color: #A7C0BC
`

const Portfolio = () => {
  return (
    <PortfolioContainer>
      <HeaderStyle>Some Projects I've Done</HeaderStyle>
      <Projects />
    </PortfolioContainer>
  )
}

export default Portfolio
