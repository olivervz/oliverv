import React from 'react'
import styled from 'styled-components'
import EmailButton from '../EmailButton'
import Header from '../Header'

const Intro = styled.div`
  position: relative;
  top: 15vh;
  left: 10vw;
  width: 50vw;
`
const IntroOne = styled.h2`
  /* Hi, my name is */

  position: relative;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 25px;
  line-height: 26px;

  color: #A7C0BC;
`
const IntroTwo = styled.h1`
  /* Oliver Vazquez */

  position: relative;
  top: -25px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 65px;
  line-height: 59px;

  /* identical to box height */

  color: #FFFFFF;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const IntroThree = styled.p`
  /* I am a Senior at ... */

  position: relative;
  top: -50px;

  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 25;
  line-height: 26px;

  color: #A7C0BC;
`

const Main = () => {
  return (
    <div>
      <Header />
      <Intro>
        <IntroOne>
          Hi, my name is
        </IntroOne>
        <IntroTwo>
          Oliver Vazquez
        </IntroTwo>
        <IntroThree>
          I am a Senior at Northeastern University studying
          Computer Engineering & Computer Science. I am actively 
          seeking a full-time Software Engineering position for 
          January of 2021.
        </IntroThree>
        <EmailButton />
      </Intro>
    </div>
  )
}

export default Main
