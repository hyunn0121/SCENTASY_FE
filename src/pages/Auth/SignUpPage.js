import React from "react";
import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ExtraInfoContext } from "../../contexts/ExtraInfoContext";
import axios from "axios";


import ic_login from '../../assets/images/ic_loginPerson.png';
import ic_kakao from '../../assets/images/ic_kakao.png';
import ic_google from '../../assets/images/ic_google.png';

const MainContainer = styled.div`
  display: flex; /* 자식 요소 -> 수평 배치 */
  justify-content: space-between;
  align-items: center; /* 수직 중앙 정렬 */
  padding-right: 80px; /* 오른쪽 여백 80px */
  margin-top: 50px;
  box-sizing: border-box;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 250px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 50px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Scentazy = styled.h4`
  font-size: 35px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  text-align: left;
  line-height: 2;
`;

const Register = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #4D47C3;
`;

const Icon = styled.img`
  width: 200px; /* 아이콘의 크기를 설정 */
  height: auto;
  margin-left: 40px; /* 좌우 여백을 설정 */
  margin-bottom: -10px; /* 아이콘을 조금 더 하단으로 이동 */
`;

const SignUpContent = styled.div`
  width: 650px;
  height: 550px;
  display: flex;
  border-radius: 40px;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background-color: #F7E1D7;
  padding: 0 20px; /* 패딩 추가 */
`;

const ContentTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  margin-top: 45px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: flex-start; /* 왼쪽 정렬 */
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 11px 16px 11px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 12px;
  box-sizing: border-box;

    &::placeholder {
    color: #828282;
    font-size: 20px;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const SignUpButton = styled.button`
  width: 80%;
  padding: 12px 12px;
  background-color: #F5CAC3;
  border-radius: 8px;
  border: 0px;
  font-size: 20px;
  font-weight: regular;
`;

const SocialDescription = styled.p`
  font-size: 16px;
  color: #828282;
`;

const SocialButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const SocialButton = styled.img`
  width: 200px;
  height: 100px;
  object-fit: contain; /* 이미지 비율 유지 */
`;

const SignUpPage = () => {

  const navigate = useNavigate();
  const { setExtraInfo } = useContext(ExtraInfoContext);

  const handleAddInfoClick = async () => {
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
      const response = await axios.post(`${process.env.REACT_APP_API_KEY}/auth/signup`, {
        email,
        password,
      });

      const { message, code, data  } = response.data;

      console.log(response);
      console.log(response.data.code);

      // 이메일을 extraInfo에 저장
      setExtraInfo((prevInfo) => ({
        ...prevInfo,
        email: email,  // 이메일 저장
      }));

      if (code === "0000") {
        alert('회원가입이 완료되었습니다.');
        navigate('/addInfo');
      } else if (code === "4201") {
        alert("중복된 이메일입니다. 다른 이메일로 다시 시도해주세요.")
        // alert(`회원가입 실패: ${message} (코드: ${code})`);
      } else if (code === "4100") {
        console.log("파라미터 누락")
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.")
        alert(`회원가입 실패: ${message} (코드: ${code})`);
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생: ", error);
      alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("응답 상태:", error.response.status);
        console.error("응답 헤더:", error.response.headers);
      } else if (error.request) {
        console.error("요청이 전송되었으나 응답이 수신되지 않음:", error.request);
      } else {
        console.error("요청 설정 중 오류 발생:", error.message);
      }
    }
    
  };

  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

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
    validateConfirmPassword(confirmPassword, value);
  };

  const validateConfirmPassword = (confirmValue, passValue) => {
    if (confirmValue === '') {
      setConfirmPasswordError('');
    } else if (confirmValue !== passValue) {
      setConfirmPasswordError('비밀번호가 같지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value, password);
  };

  const hasErrors = passwordError || confirmPasswordError;

  return (
    <MainContainer>
      <Container>
      <Title>Sign up to</Title>
      <Scentazy>SCENTASY</Scentazy>
      <Description>If you don’t have an account register<br />You can <Register>Register here !</Register></Description>
    </Container>
    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Icon src={ic_login} alt="Login Icon" />
        <SignUpContent >
          <ContentTitle>Sign Up</ContentTitle>
          <FormGroup>
            <Label>이메일</Label>
            <Input type="email" 
              placeholder="email@domain.com" 
              value={email} 
              onChange={handleEmailChange} 
            />
            <ErrorMessage isVisible={!isEmailValid}>이메일 형식이 올바르지 않습니다.</ErrorMessage>
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input 
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <ErrorMessage isVisible={hasErrors}>{passwordError || confirmPasswordError}</ErrorMessage>
          </FormGroup>
          <SignUpButton onClick={handleAddInfoClick}>이메일로 회원가입</SignUpButton>
          <SocialDescription>or continue with</SocialDescription>
          {/* <SocialButtonContainer>
            <SocialButton src={ic_kakao} alt="Kakao Button" />
            <SocialButton src={ic_google} alt="Google Button" />
          </SocialButtonContainer> */}
          </SignUpContent>
    </div>
    </MainContainer>

  )
}

export default SignUpPage;