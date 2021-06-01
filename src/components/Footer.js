import React from 'react'
import styled from 'styled-components'


const FooterStyle = styled.ul`
  position: absolute;
  top: 85vh;
  left: 46vw;
  list-style-type: none;
`
const FooterItemStyle = styled.li`
  padding: 10px;
  text-align: center;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;

  color: #A7C0BC;
`

const Footer = () => {
  return (
    <FooterStyle>
      <FooterItemStyle>Portfolio</FooterItemStyle>
      <FooterItemStyle>
        <svg width="36" height="48" viewBox="0 0 54 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.5 54.765L6.345 38.655L0 45L27 72L54 45L47.655 38.655L31.5 54.765V0H22.5V54.765Z" fill="#A7C0BC"/>
        </svg>
      </FooterItemStyle>
    </FooterStyle>

  )
}

export default Footer
