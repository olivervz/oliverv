import React from "react";
import styled from "styled-components";
import EmailButton from "../EmailButton";
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Intro = styled.div`
    position: relative;
    top: max(200px, calc((200 / 1440) * 100vw));
    left: max(50px, calc((150 / 1440) * 100vw));
    width: max(250px, calc((600 / 1440) * 100vw));
`;
const IntroOne = styled.h2`
    /* Hi, my name is */

    position: relative;

    font-family: MontserratMedium;
    font-style: normal;
    font-weight: normal;
    font-size: max(15px, calc((25 / 1440) * 100vw));
    line-height: max(15px, calc((26 / 1440) * 100vw));

    color: #a7c0bc;
`;
const IntroTwo = styled.h1`
    /* Oliver Vazquez */

    position: relative;
    top: max(3px, calc((10 / 1440) * 100vw));

    font-family: MontserratMedium;
    font-style: normal;
    font-weight: normal;
    font-size: max(30px, calc((75 / 1440) * 100vw));
    // line-height: 8vh;
    line-height: max(40px, calc((75 / 1440) * 100vw));

    color: #ffffff;

    text-shadow: 0px calc((4 / 1440) * 100vw) calc((4 / 1440) * 100vw)
        rgba(0, 0, 0, 0.25);
`;
const IntroThree = styled.p`
    /* I am a Senior at ... */

    position: relative;
    top: max(6px, calc((25 / 1440) * 100vw));

    font-family: MontserratMedium;
    font-style: normal;
    font-weight: normal;
    font-size: max(10px, calc((23 / 1440) * 100vw));

    color: #a7c0bc;
`;

const Main = () => {
    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, []);
    return (
        <div style={{ position: "relative" }}>
            <Header data-aos="fade-up" />
            <Intro>
                <IntroOne>Hi, my name is</IntroOne>
                <IntroTwo>Oliver Vazquez</IntroTwo>
                <IntroThree>
                    I am a Senior at Northeastern University studying Computer
                    Engineering & Computer Science. I am actively seeking a
                    full-time software engineering position for January of 2022.
                </IntroThree>
                <EmailButton />
            </Intro>
            <Footer />
        </div>
    );
};

export default Main;
