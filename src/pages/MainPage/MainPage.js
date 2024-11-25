import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

import TypingTextContainer from './TypingTextContainer';
import backgroundImage1 from '../../assets/images/img_onboarding1.png';
import backgroundImage2 from '../../assets/images/img_onboarding2.png';
import backgroundImage3 from '../../assets/images/img_onboarding3.png';

import onboarding_perfumeQuestion from '../../assets/images/ic_onboarding_perfumeQuestion.png';
import onboarding_person from '../../assets/images/ic_onboarding_person.png';
import onboarding_userChat from '../../assets/images/ic_onboarding_user.png';
import onboarding_Chatbot from '../../assets/images/ic_onboarding_chatbot.png';


const GlobalStyle = createGlobalStyle`
    html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto; /* 스크롤 O */
    }
`;

// 페이드 아웃 애니메이션 (타이틀과 콘텐츠)
const fadeOut = keyframes`
    0% { opacity: 1; }
    100% { opacity: 0; }
`;

// 채팅 버블 왼쪽에서 슬라이드
const slideInLeft = keyframes`
    0% { transform: translateX(-100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
`;

// 채팅 버블 왼쪽으로 다시 사라짐
const slideOutLeft = keyframes`
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-100%); opacity: 0; }
`;

// 채팅 버블 오른쪽에서 슬라이드
const slideInRight = keyframes`
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
`;

// 채팅 버블 오른쪽으로 다시 사라짐
const slideOutRight = keyframes`
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
`;

const fade = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const slide = keyframes`
    0% { transform: translateX(100%); }
    100% { transform: translateX(0); }
`;


const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;

    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; /* 배경 고정으로 parallax 효과 */

    width: 100vw;
    min-height: 100vh
`;

const Title = styled.h1`
    font-size: 48px;
    text-align: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 1s ease-in-out;
`;

const Scentasy = styled.span`
    color: teal;
`;

const Content = styled.p`
    font-size: 24px; /* 폰트 크기를 조정 */
    text-align: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    font-family: "Montserrat-Regular";
    margin: 0 0 10px 0;
`;

const ScentIntroButton = styled.p`
    font-size: 16px; /* 폰트 크기를 조정 */
    text-align: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    font-family: "Pretendard-SemiBold";
    text-decoration: underline;
    color: #00656D;
    margin: 0;
`;

const StyledTypingTextContainer = styled.div`
    width: 100vw;
    height: auto;
    min-height: 200px;
    margin-top: 100px;
    font-size: 36px;
    text-align: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 1s ease-in-out;
    z-index: 10;
`;

const PerfumeQuestionContainer = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    margin-top: 100px;
`;

const PerfumeQuestion = styled.img`
    width: 550px;
    height: 130px;
    justify-content: center;
    align-items: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 1s ease-in-out; /* 흐림-선명 효과 */
`;

const PerfumePerson = styled.img`
    width: 1000px;
    height: 460px;
    justify-content: center;
    align-items: center;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transition: opacity 1s ease-in-out; /* 흐림-선명 효과 */
`;

const ChatSection = styled.section`
    width: 100vw;
    min-height: 200vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
`;

const ChatBubble = styled.div`
    position: relative;
    margin: 20px;
    background-size: auto;
    background-repeat: no-repeat;
    opacity: 0;
    transform: translateX(${props => (props.isUser ? '100%' : '-100%')});
    &.visible {
        opacity: 1;
        transform: translateX(0);
        animation: ${props => (props.isUser ? slideInRight : slideInLeft)} 0.8s ease-out;
    }
`;


// 이미지 버블 스타일
const ChatBubbleImage = styled.img`
    opacity: 0;

    transform: translateX(${props => (props.isUser ? '100%' : '-100%')});
    transition: opacity 0.8s, transform 0.8s ease-out;
    &.visible {
        opacity: 1;
        transform: translateX(0);
        animation: ${props => (props.isUser ? slideInRight : slideInLeft)} 0.8s ease-out;
    }
    &.hidden {
        animation: ${props => (props.isUser ? slideOutRight : slideOutLeft)} 0.8s ease-out forwards;
    }
    margin-bottom: 200px;
`;

const ChatContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 40px;
`;

const MainPage = () => {

    const [currentImage, setCurrentImage] = useState(backgroundImage1);
    const [isTitleVisible, setIsTitleVisible] = useState(true);
    const [isTypingTextVisible, setIsTypingVisible] = useState(false);
    const [isQuestionVisible, setIsQuestionVisible] = useState(false);
    const images = [backgroundImage1, backgroundImage2, backgroundImage3];
    let currentIndex = 0;
    const typingTextRef = useRef(null);
    const questionImageRef = useRef(null);

    const userChatRef = useRef(null);
    const chatbotRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 500) {
                navigate('/about');
            } else {
                navigate('/');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            setCurrentImage(images[currentIndex]);
        }, 2000); // 2초마다 이미지 변경

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌을 정리
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log("타이핑 텍스트 표시 시작!");
                        setIsTypingVisible(true);
                    } else {
                        setIsTypingVisible(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (typingTextRef.current) observer.observe(typingTextRef.current);

        return () => {
            if (typingTextRef.current) observer.unobserve(typingTextRef.current);
        };
    }, []);

    useEffect(() => {
        const options = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.classList.remove('hidden');
                } else {
                    entry.target.classList.add('hidden');
                    entry.target.classList.remove('visible');
                }
            });
        }, options);

        if (userChatRef.current) observer.observe(userChatRef.current);
        if (chatbotRef.current) observer.observe(chatbotRef.current);

        return () => {
            if (userChatRef.current) observer.unobserve(userChatRef.current);
            if (chatbotRef.current) observer.unobserve(chatbotRef.current);
        };
    })

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsQuestionVisible(true);
                    } else {
                        setIsQuestionVisible(false);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (questionImageRef.current) observer.observe(questionImageRef.current);

        return () => {
            if (questionImageRef.current) observer.unobserve(questionImageRef.current);
        };
    }, []);

    // 스크롤 이벤트 핸들러
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            // 일정 스크롤 위치에서 Title과 Content를 사라지게 함
            if (scrollPosition > 100) {
                setIsTitleVisible(false);
            } else {
                setIsTitleVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScentIntro = () => {
        navigate('/scentIntro');
    };

    return (
        <>
        <GlobalStyle />
        <MainContent backgroundImage={currentImage}>
            <Title isVisible={isTitleVisible}>꿈꿔왔던 나만의 향을 실현해 주는<br/> AI 향수 조향사<Scentasy onClick={handleScentIntro}> Scentasy</Scentasy></Title>
            <Content isVisible={isTitleVisible}>Chat, Create, and<br/>Wear Your Scent</Content>
            <ScentIntroButton onClick={handleScentIntro} isVisible={isTitleVisible}>향료가 더 궁금하시다면?</ScentIntroButton>
        </MainContent>

        {/* 타이핑 텍스트 */}
        <StyledTypingTextContainer isVisible={isTypingTextVisible} ref={typingTextRef}>
            {isTypingTextVisible && <TypingTextContainer/>}
        </StyledTypingTextContainer>

        <PerfumeQuestionContainer ref={questionImageRef}>
            <PerfumeQuestion
                src={onboarding_perfumeQuestion}
                isVisible={isQuestionVisible}
                alt="Perfume Question" />
        </PerfumeQuestionContainer>

        
        {/* 스크롤할 때 채팅 버블이 보이도록 하는 부분 */}
        <ChatSection>
            <ChatBubbleImage ref={userChatRef} src={onboarding_userChat} isUser={true} />
            <ChatBubbleImage ref={chatbotRef} src={onboarding_Chatbot} isUser={false} />
        </ChatSection>
        {/* 더 많은 채팅 메시지와 섹션을 추가할 수 있습니다 */ }
        </>
    );
};

export default MainPage;