import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

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
  border: 2px solid ${({ isError }) => (isError ? '#FF0303' : '#E0E0E0')};
  border-radius: 10px;
  width: 500px;
  font-size: 20px;
  box-sizing: border-box;
  outline: none; /* 포커스 시 기본 테두리 제거 */

  &:focus {
    border-color: ${({ isError }) => (isError ? '#FF0303' : '#00656D')}; /* 포커스 시 커스텀 테두리 색상 */
  }
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value) => {
    if (value === '') {
      setIsEmailValid(true);
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      setIsEmailValid(emailRegex.test(value));
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~\-=`{}|:"<>?,./]{8,}$/;
    if (value === '') {
      setPasswordError('');
    } else if (!passwordRegex.test(value)) {
      setPasswordError('최소 8자 이상이어야 하며, 숫자와 영문자를 포함해야 합니다.');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const hasErrors = passwordError

  const handleLoginClick = async () => {
    if (email === '') {
      alert("이메일을 입력하세요.");
      return;
    }
    if (password === '') {
      alert("비밀번호를 입력하세요.");
      return;
    }
    if (!isEmailValid || hasErrors) {
      alert("올바른 이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/login`, {
        email,
        password,
      });

      // const { code, message, data } = response.data;
      console.log(response);


      const { accessToken, refreshToken } = response.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      alert("로그인 되었습니다."); // 성공 메시지 알림
      navigate('/about');

      /*
      if (code === "200") {
        const { accessToken, refreshToken } = result;
  
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
  
        alert("로그인 되었습니다."); // 성공 메시지 알림
        navigate('/about');
      } else if (code === "4300") {
        alert("비밀번호를 확인해주세요.")
        // alert(`로그인 실패: ${message} (코드: ${code})`);
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.")
      } */
    } catch (error) {
      console.error("로그인 중 오류 발생: ", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // /signup 경로로 이동합니다
  };


  return (
    <div>
      <TitleContainer>
        <Title>Sign In</Title>
        <TitleContext>Enter your email to sign up for this app</TitleContext>
      </TitleContainer>
      <InputWrapper>
        <Input
            type="email"
            placeholder="email@domain.com"
            value={email}
            onChange={handleEmailChange}
            isError={!isEmailValid}
          />
      </InputWrapper>
      <InputWrapper>
        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </InputWrapper>
      <Button onClick={handleLoginClick}>이메일로 로그인</Button>
      <GuideText>or Continue With</GuideText>
      <Button onClick={handleSignUpClick}>이메일로 회원가입</Button>
    </div>
  )
}

export default LoginPage;