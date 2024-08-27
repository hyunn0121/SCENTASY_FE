import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import backgroundImage from '../../assets/images/img_onboarding.png';

const GlobalStyle = createGlobalStyle`
    html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
    }
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;

    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    width: 100vw;
    height: 100vh; 
    margin: 0;
`;

const Title = styled.h1`
    font-size: 48px; /* 폰트 크기를 조정 */
    text-align: center; 
`;

const Scentasy = styled.span`
    color: teal;
`;

const Content = styled.p`
    font-size: 24px; /* 폰트 크기를 조정 */
    text-align: center;
`;

const MainPage = () => {
    return (
        <>
        <GlobalStyle />
        <MainContent>
            <Title>꿈꿔왔던 나만의 향을 실현시켜주는<br/> AI 향수 조향사<Scentasy> Scentasy</Scentasy></Title>
            <Content>Chat, Create, and<br/>Wear Your Scent</Content>
        </MainContent>
        </>
    );
};

export default MainPage;