import React from "react";
import styled from "styled-components";

const FooterStyle = styled.div`
    position: relative;
    top: 53vh;
`;

const FooterItemStyle2 = styled.div`
    padding: 0px;
    text-align: center;

    font-family: MontserratMedium;
    font-style: normal;
    font-weight: normal;
    font-size: max(20px, calc((20 / 1440) * 100vw));
    line-height: max(20px, calc((30 / 1440) * 100vw));

    color: #a7c0bc;
`;

const FooterArrowStyle = styled.svg`
    width: max(30px, calc((36 / 1440) * 100vw));
    height: max(30px, calc((48 / 1440) * 100vw));
`;

const Footer = () => {
    return (
        <FooterStyle>
            <FooterItemStyle2>Portfolio</FooterItemStyle2>
            <FooterItemStyle2>
                <FooterArrowStyle
                    viewBox="0 0 54 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M22.5 54.765L6.345 38.655L0 45L27 72L54 45L47.655 38.655L31.5 54.765V0H22.5V54.765Z"
                        fill="#A7C0BC"
                    />
                </FooterArrowStyle>
            </FooterItemStyle2>
        </FooterStyle>
    );
};

export default Footer;
