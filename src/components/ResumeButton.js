import React from 'react'
import styled from 'styled-components'

const ResumeButtonStyle = styled.button`
  height: 49px;
  width: 90px;

  background: #A7C0BC;
  border-radius: 4px;

  &:hover {
    background: #3B5954;
    color: #A7C0BC;
    border: 0.4px solid #A7C0BC;
  }
  transition: all .4s ease;

  font-family: Fira Code;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;

  color: #3B5954;

  border: none;
`

const ResumeButton = () => {
  return (
    <a href='/documents/Resume.pdf'>
      <ResumeButtonStyle>Resume</ResumeButtonStyle>
    </a>
  )
}

export default ResumeButton
