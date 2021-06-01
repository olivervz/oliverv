import React from 'react'
import styled from 'styled-components'

const PortfolioContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;

`
const HeaderStyle = styled.h1`
  text-align: center;
  top: 10vh;
  width: 40vw;
`

const Portfolio = () => {
  return (
    <PortfolioContainer>
      <HeaderStyle>Some Projects I've Done</HeaderStyle>
    </PortfolioContainer>
  )
}

export default Portfolio
