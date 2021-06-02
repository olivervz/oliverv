import React from "react";
import styled from "styled-components";
import { Link } from "browser-router";

const EmailButtonStyle = styled.button`
  /* Email Button */

  position: relative;
  width: 210px;
  height: 40px;
  top: 45px;

  background: #a7c0bc;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  /* Shoot me an email */
  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;

  color: #3b5954;

  border: 0.4px solid #3b5954;

  &:hover {
    background-color: #3b5954;
    color: #a7c0bc;
    border: 0.4px solid #a7c0bc;
    cursor: pointer;
  }
  transition: all 0.8s ease;
`;

const EmailButton = () => {
  return (
    <a href="mailto:vazquez.o@northeastern.edu">
      <EmailButtonStyle href="mailto:vazquez.o@northeastern.edu">
        Shoot me an Email
      </EmailButtonStyle>
    </a>
  );
};

export default EmailButton;
