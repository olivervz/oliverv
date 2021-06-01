import React from 'react'
import styled from 'styled-components'

const LinkedinButtonStyle = styled.button`
  height: 49px;
  width: 49px;

  background: #A7C0BC;
  border-radius: 4px;
  border: none;

  &:hover {
    background: #78948F;
    color: #A7C0BC;
    border: 0.4px solid #A7C0BC;
  }
  transition: all .4s ease;
`

const LinkedinButton = () => {
  return (
    <a href='https://www.linkedin.com/in/olivervz/'>
      <LinkedinButtonStyle>
        <svg width="26" height="26" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.10332 7.83983C6.06702 7.83983 7.65892 6.24793 7.65892 4.28423C7.65892 2.32053 6.06702 0.728638 4.10332 0.728638C2.13962 0.728638 0.547729 2.32053 0.547729 4.28423C0.547729 6.24793 2.13962 7.83983 4.10332 7.83983Z" fill="#3B5954"/>
        <path d="M10.9152 10.4676H16.808V13.1671C16.808 13.1671 18.4071 9.96889 22.758 9.96889C26.6391 9.96889 29.8543 11.8808 29.8543 17.7086V29.9978H23.7477V19.1978C23.7477 15.7599 21.9123 15.3818 20.5137 15.3818C17.6112 15.3818 17.1143 17.8854 17.1143 19.6462V29.9978H10.9152V10.4676Z" fill="#3B5954"/>
        <path d="M1.00382 10.4675H7.20283V29.9977H1.00382V10.4675Z" fill="#3B5954"/>
        </svg>
      </LinkedinButtonStyle>
    </a>

  )
}

export default LinkedinButton
