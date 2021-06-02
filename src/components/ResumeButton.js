import React from "react";
import styled from "styled-components";

const ResumeButtonStyle = styled.button`
  height: 49px;
  width: 90px;

  background: #a7c0bc;
  border-radius: 4px;

  &:hover {
    background: #3b5954;
    color: #a7c0bc;
    border: 0.4px solid #a7c0bc;
    cursor: pointer;
  }
  transition: all 0.8s ease;

  font-family: MontserratMedium;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 30px;

  color: #3b5954;

  border: none;
`;

const ResumeButton = () => {
  return (
    <a href="/documents/Resume.pdf">
      <ResumeButtonStyle>Resume</ResumeButtonStyle>
    </a>
  );
};

export default ResumeButton;
