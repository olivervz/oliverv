import React from 'react'
import styled from 'styled-components'
import { Link } from 'browser-router'

const EmailButtonStyle = styled.button`
  /* Email Button */

  position: relative;
  top: -50px;
  width: 210px;
  height: 40px;

  background: #A7C0BC;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  /* Shoot me an email */
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;

  color: #3B5954;

  border: 0.4px solid #3B5954;

  &:hover {
    background-color: #3B5954;
    color: #A7C0BC;
    border: 0.4px solid #A7C0BC;
  }
  transition: all .4s ease;
`


const EmailButton = () => {

  return (
    <a href='mailto:vazquez.o@northeastern.edu'>
      <EmailButtonStyle href='mailto:vazquez.o@northeastern.edu'>
        Shoot me an Email
      </EmailButtonStyle>
    </a>
  )
}

export default EmailButton
