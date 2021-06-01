import React from 'react'
import styled from 'styled-components'
import EmailButton from '../EmailButton'
import Header from '../Header'
import Footer from '../Footer'

const Intro = styled.div`
  position: relative;
  top: 20vh;
  left: 15vw;
  width: max(300px, 40vw);
`
const IntroOne = styled.h2`
  /* Hi, my name is */

  position: relative;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: max(15px, 1.5vw)
  line-height: 26px;

  color: #A7C0BC;
`
const IntroTwo = styled.h1`
  /* Oliver Vazquez */

  position: relative;
  top: 15px;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: max(40px, 5vw);
  line-height: 59px;

  /* identical to box height */

  color: #FFFFFF;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`
const IntroThree = styled.p`
  /* I am a Senior at ... */

  position: relative;
  top: 30px;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: max(10px, 1.25vw);
  line-height: 26px;

  color: #A7C0BC;
`

const Main = () => {
  return (
    <div style={{position: 'relative'}}>
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
      <Footer />
    </div>
  )
}

export default Main
