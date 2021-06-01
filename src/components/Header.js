import React from 'react'
import styled from 'styled-components'
import GithubButton from './GithubButton'
import LinkedinButton from './LinkedinButton'
import SpotifyButton from './SpotifyButton'
import ResumeButton from './ResumeButton'

const HeaderListStyle = styled.ul`
  position: absolute;
  left: 75vw;
  top: 5vh;
  border: 1px solid #A7C0BC;
  padding: 0px;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  list-style-type: none;
`
const HeaderItemStyle = styled.li`
  float: left;
  padding: 0.3vh;
`

const Header = () => {
  return (
    <HeaderListStyle>
      <HeaderItemStyle>
        <GithubButton />
      </HeaderItemStyle>
      <HeaderItemStyle>
        <LinkedinButton />
      </HeaderItemStyle>
      <HeaderItemStyle>
        <SpotifyButton />
      </HeaderItemStyle>
      <HeaderItemStyle>
        <ResumeButton />
      </HeaderItemStyle>
    </HeaderListStyle>
  )
}

export default Header
