import React from "react";
import styled from "styled-components";
import { Link } from "browser-router";

const EmailButtonStyle = styled.button`
    /* Email Button */

    position: relative;
    width: max(100px, calc((250 / 1440) * 100vw));
    height: max(20px, calc((50 / 1440) * 100vw));
    top: calc((45 / 1440) * 100vw);

    background: #a7c0bc;
    border-radius: calc((4 / 1440) * 100vw);
    box-shadow: 0px calc((4 / 1440) * 100vw) calc((4 / 1440) * 100vw)
        rgba(0, 0, 0, 0.25);

    /* Shoot me an email */
    font-family: MontserratMedium;
    font-style: normal;
    font-weight: normal;
    font-size: max(8px, calc((20 / 1440) * 100vw));

    color: #3b5954;

    border: calc((0.4 / 1440) * 100vw) solid #3b5954;

    &:hover {
        background-color: #3b5954;
        color: #a7c0bc;
        border: calc((0.4 / 1440) * 100vw) solid #a7c0bc;
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
