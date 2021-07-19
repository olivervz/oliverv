import React from "react";
import styled from "styled-components";
import GithubButton from "./GithubButton";
import LinkedinButton from "./LinkedinButton";
import ResumeButton from "./ResumeButton";

const HeaderListStyle = styled.ul`
    position: absolute;
    right: max(50px, calc((150 / 1440) * 100vw));
    top: max(50px, calc((75 / 1440) * 100vw));
    border: max(1px, calc((1 / 1440) * 100vw)) solid #a7c0bc;
    border-radius: calc((4 / 1440) * 100vw);
    padding: 0px;
    box-sizing: border-box;
    box-shadow: 0px calc((4 / 1440) * 100vw) calc((4 / 1440) * 100vw)
        rgba(0, 0, 0, 0.25);
    list-style-type: none;
`;
const HeaderItemStyle = styled.li`
    float: left;
    padding: max(1px, calc((2 / 1440) * 100vw));
`;

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
                <ResumeButton />
            </HeaderItemStyle>
        </HeaderListStyle>
    );
};

export default Header;
