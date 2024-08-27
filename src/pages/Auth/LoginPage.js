import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const TitleContainer = styled.div`
  margin-bottom: 52px;
`;

const Title = styled.h1`
  font-size: 50px;
  text-align: center;
`;

const TitleContext = styled.p`
  font-size: 25px;
  text-align: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  border: 3px solid #E0E0E0;
  border-radius: 10px;
  width: 500px;
  font-size: 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 16px;
  width: 500px;
  border: none;
  border-radius: 10px;
  background-color: #00656D;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-sizing: border-box;
`;

const GuideText = styled.p`
  font-size: 20px;
  text-align: center;
  color: #828282;
`;

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다

  const handleSignUpClick = () => {
    navigate('/signup'); // /signup 경로로 이동합니다
  }


  return (
    <div>
      <TitleContainer>
        <Title>Sign In</Title>
        <TitleContext>Enter your email to sign up for this app</TitleContext>
      </TitleContainer>
      <InputWrapper>
        <Input
          type="email"
          placeholder="email@domain.com"/>
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          placeholder="password"/>
      </InputWrapper>
      <Button>이메일로 로그인</Button>
      <GuideText>or Continue With</GuideText>
      <Button onClick={handleSignUpClick}>이메일로 회원가입</Button>
    </div>
  )
}

export default LoginPage;