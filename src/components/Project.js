import React from "react";
import styled from "styled-components";

const ContainerStyle = styled.div`
    /* Rounded Outer Container */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    width: max(150px, calc((250 / 1440) * 100vw));
    height: max(200px, calc((250 / 1440) * 100vw));

    background: #ffffff;
    &:hover {
        box-shadow: calc((10 / 1440) * 100vw) calc((10 / 1440) * 100vw)
            calc((4 / 1440) * 100vw) rgba(0, 0, 0, 0.25);
        transform: translate(0, calc((-2 / 1440) * 100vw));
    }
    transition: all 0.4s ease;
    box-shadow: calc((6 / 1440) * 100vw) calc((6 / 1440) * 100vw)
        calc((4 / 1440) * 100vw) rgba(0, 0, 0, 0.25);
    border-radius: max(9px, calc((10 / 1440) * 100vw));
`;

const TitleStyle = styled.h1`
    position: relative;
    width: max(100px, calc((197 / 1440) * 100vw));
    height: max(20px, calc((24 / 1440) * 100vw));
    top: min(-20px, calc((-20 / 1440) * 100vw));
    text-align: center;

    font-family: MontserratBold;
    font-style: normal;
    font-weight: 500;
    font-size: max(12px, calc((18 / 1440) * 100vw));
    line-height: max(12px, calc((24 / 1440) * 100vw));

    color: #3b5954;
`;
const DescriptionStyle = styled.p`
    position: relative;
    width: max(100px, calc((197 / 1440) * 100vw));
    height: max(80px, calc((123 / 1440) * 100vw));
    top: max(-20px, calc((-10 / 1440) * 100vw));
    text-align: left;

    font-family: MontserratMedium;
    font-style: normal;
    font-weight: 500;
    font-size: max(8px, calc((13 / 1440) * 100vw));
    line-height: max(8px, calc((16 / 1440) * 100vw));

    color: #3b5954;
`;

const FooterStyle = styled.div`
    flex-direction: row;
    text-align: center;
    width: max(100px, calc((197 / 1440) * 100vw));
`;
const GithubSVGContainerStyle = styled.div`
    /* github logo */

    display: inline-block;
    position: relative;
    width: max(25px, calc((30 / 1440) * 100vw));
    height: max(25px, calc((31 / 1440) * 100vw));
    top: max(20px, calc((25 / 1440) * 100vw));
`;
const LinkSVGContainerStyle = styled.div`
    /* link icon */
    display: inline-block;
    position: relative;
    width: max(18px, calc((30 / 1440) * 100vw));
    height: max(18px, calc((31 / 1440) * 100vw));
    top: max(20px, calc((25 / 1440) * 100vw));
`;

const GithubButtonStyle = styled.button`
    background: white;
    border: none;
    width: max(20px, calc((26 / 1440) * 100vw));
    height: max(20px, calc((26 / 1440) * 100vw));
    &:hover {
        transform: translate(0, calc((-2 / 1440) * 100vw));
        cursor: pointer;
    }
    transition: all 0.4s ease;
`;

const LinkButtonStyle = styled.button`
    background: white;
    border: none;
    width: max(17px, calc((21 / 1440) * 100vw));
    height: max(18px, calc((24 / 1440) * 100vw));
    &:hover {
        transform: translate(0, calc((-2 / 1440) * 100vw));
        cursor: pointer;
    }
    transition: all 0.4s ease;
`;
const TechnologyStyle = styled.h3`
    position: relative;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
    width: max(100px, calc((167 / 1440) * 100vw));
    height: max(10px, calc((20 / 1440) * 100vw));
    top: max(10px, calc((20 / 1440) * 100vw));

    font-family: MontserratThin;
    font-style: normal;
    font-weight: 1000;
    font-size: max(6px, calc((10 / 1440) * 100vw));
    line-height: max(6px, calc((12 / 1440) * 100vw));
    /* identical to box height */

    color: #3b5954;
`;

const Project = ({ title, description, technologies, githublink, link }) => {
    return (
        <ContainerStyle>
            <TitleStyle>{title}</TitleStyle>
            <DescriptionStyle>{description}</DescriptionStyle>
            <TechnologyStyle>{technologies}</TechnologyStyle>
            <FooterStyle>
                <a href={githublink}>
                    <GithubSVGContainerStyle>
                        <GithubButtonStyle>
                            <svg
                                viewBox="0 0 26 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.0325 0.583313C6.91618 0.582502 1.70229 5.16613 0.723019 11.4048C-0.256251 17.6435 3.28826 23.6951 9.09127 25.692C9.71627 25.8083 9.94002 25.4117 9.94002 25.0707C9.94002 24.7646 9.93002 23.9534 9.92627 22.8749C6.45752 23.6499 5.72502 21.1466 5.72502 21.1466C5.49666 20.3677 5.00574 19.6991 4.34127 19.2621C3.21627 18.4626 4.42752 18.4806 4.42752 18.4806C5.22837 18.5941 5.93321 19.0844 6.33627 19.8085C6.67744 20.4495 7.25222 20.9231 7.9329 21.1242C8.61358 21.3253 9.34379 21.2371 9.96127 20.8793C10.0193 20.2257 10.3007 19.6148 10.755 19.1562C7.98752 18.832 5.07752 17.7263 5.07752 12.7883C5.06216 11.5111 5.52114 10.2764 6.36002 9.33823C5.98046 8.22651 6.02516 7.0071 6.48502 5.92823C6.48502 5.92823 7.53127 5.58077 9.91252 7.24702C11.9548 6.66836 14.1102 6.66836 16.1525 7.24702C18.535 5.57948 19.58 5.92823 19.58 5.92823C20.042 7.00659 20.0867 8.22685 19.705 9.33823C20.547 10.2763 21.0056 11.5142 20.985 12.7934C20.985 17.7444 18.0725 18.832 15.295 19.151C15.8942 19.784 16.2015 20.6524 16.1388 21.5354C16.1388 23.2585 16.1238 24.6484 16.1238 25.0707C16.1238 25.4156 16.3463 25.816 16.9825 25.6894C22.7831 23.6891 26.3238 17.6372 25.3425 11.4001C24.3613 5.16311 19.1476 0.581867 13.0325 0.583313Z"
                                    fill="#3B5954"
                                />
                            </svg>
                        </GithubButtonStyle>
                    </GithubSVGContainerStyle>
                </a>
                {link !== null ? (
                    <a href={link}>
                        <LinkSVGContainerStyle>
                            <LinkButtonStyle>
                                <svg
                                    viewBox="0 0 21 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.4512 23.2H2.70117C1.32046 23.2 0.201172 21.9464 0.201172 20.4V4.99999C0.201172 3.45359 1.32046 2.19999 2.70117 2.19999H7.70117V4.99999H2.70117V20.4H16.4512V14.8H18.9512V20.4C18.9512 21.9464 17.8319 23.2 16.4512 23.2ZM9.82617 14.3898L8.06367 12.4102L15.9299 3.59999H11.4512V0.799988H20.2012V10.6H17.7012V5.58099L9.82617 14.3898Z"
                                        fill="#3B5954"
                                    />
                                </svg>
                            </LinkButtonStyle>
                        </LinkSVGContainerStyle>
                    </a>
                ) : (
                    ""
                )}
            </FooterStyle>
        </ContainerStyle>
    );
};

export default Project;
