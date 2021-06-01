import React from 'react'
import styled from 'styled-components'
import EmailButton from '../EmailButton'
import Header from '../Header'

const Intro = styled.div`
`
const IntroOne = styled.h2`
  /* Hi, my name is */

  position: absolute;
  left: 10vw;
  top: 25vh;

  font-family: Fira Code;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5vh;
  line-height: 26px;

  color: #A7C0BC;
`
const IntroTwo = styled.h1`
  /* Oliver Vazquez */

  position: absolute;
  left: 10vw;
  top: 27vh;

  font-family: Fira Code;
  font-style: normal;
  font-weight: normal;
  font-size: 7.5vh;
  line-height: 59px;

  /* identical to box height */

  color: #FFFFFF;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const IntroThree = styled.p`
  /* I am a Senior at ... */

  position: absolute;
  width: 40vw;
  left: 10vw;
  top: 38vh;

  font-family: Fira Code;
  font-style: normal;
  font-weight: normal;
  font-size: 2.5;
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
      </Intro>
      <EmailButton />
    </div>
  )
}

export default Main
