import React from "react";
import styled from "styled-components";

const ResumeButtonStyle = styled.button`
    height: max(25px, calc((49 / 1440) * 100vw));
    width: max(46px, calc((90 / 1440) * 100vw));

    background: #a7c0bc;
    border-radius: calc((4 / 1440) * 100vw);

    &:hover {
        background: #3b5954;
        color: #a7c0bc;
        border: calc((0.4 / 1440) * 100vw) solid #a7c0bc;
        cursor: pointer;
    }
    transition: all 0.8s ease;

    font-family: MontserratMedium;
    font-style: normal;
    font-weight: normal;
    font-size: max(9px, calc((17 / 1440) * 100vw));
    line-height: max(25px, calc((30 / 1440) * 100vw));

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
