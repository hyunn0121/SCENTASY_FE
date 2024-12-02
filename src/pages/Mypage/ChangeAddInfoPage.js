import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ExtraInfoContext } from "../../contexts/ExtraInfoContext";
import axios from "axios";


const MainContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 60px;
  margin-bottom: 60px;
`;

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  margin-bottom: 50px;
`;

const Scentasy = styled.span`
  color: #F28482;
`;

const FormContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const Label = styled.label`
  width: 300px;
  font-size: 20px;
  white-space: nowrap;
  color: #000000;
  opacity: 76%;
  text-align: left;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  height: 50px;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 20px;
  box-sizing: border-box;
  margin-right: 10px;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 20px;
  box-sizing: border-box;

  option {
    color: #666666;
  }
`;

const AddInfoButton = styled.button`
  width: 130px;
  height: 50px;
  background-color: ${({ isValid }) => (isValid === true ? '#00656D' : '#FFFFFF')};
  color: ${({ isValid }) => (isValid === true ? '#FFFFFF' : '#00656D')};
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  white-space: nowrap;
  font-weight: regular;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const SeasonButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: ${(props) => (props.active ? "#00656D" : "#ffffff")};
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  color: ${(props) => (props.active ? "#ffffff" : "#00656D")};
  white-space: nowrap;
  font-weight: regular;
  box-sizing: border-box;
  margin-right: 10px;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const NextButton = styled.button`
  width: 500px;
  height: 50px;
  margin-top: 100px;
  margin-left: 50px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  color: #00656D;
  white-space: nowrap;
  font-weight: regular;
  box-sizing: border-box;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const seasonMapping = {
  "봄": "SPRING",
  "여름": "SUMMER",
  "가을": "FALL",
  "겨울": "WINTER"
};

const ChangeAddInfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 기존 사용자 정보
  const {
    originNickname = "",
    originAge = "",
    originGender = "",
    originSeason = "",
    originLikedScents = [],
    originDislikedScents = []
  } = location.state || {};

  const { extraInfo, setExtraInfo } = useContext(ExtraInfoContext)

  const [nickname, setNickname] = useState(originNickname);
  const [isNicknameValid, setIsNicknameValid] = useState(null);
  const [gender, setGender] = useState(originGender);
  const [age, setAge] = useState(originAge);
  const [season, setSeason] = useState(originSeason);
  const [clickedButton, setClickedButton] = useState(originSeason);

  const handleNicknameCheck = async () => {

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_KEY}/auth/exists/${nickname}`);
      console.log(response);
      const { code, result } = response.data;

      if (code === "0000") {
          if (result) {
              alert("닉네임이 이미 사용 중입니다.");
              setIsNicknameValid(false);
          } else {
              alert("닉네임 사용 가능합니다.");
              setIsNicknameValid(true);
          }
      } else if (code === "4202") {
          alert("이미 존재하는 닉네임입니다. 다른 이름을 입력해주세요.");
          setIsNicknameValid(false);
      } else {
          alert("닉네임은 영문만 가능합니다. 다시 확인해주세요.");
          setIsNicknameValid(false);
      }
  } catch (error) {
      console.error("닉네임 중복 확인 오류:", error);
      if (error.response && error.response.data) {
        const { message, code } = error.response.data;
        
        // 서버 응답에 code가 포함된 경우 처리
        if (code === "4202") {
          alert("이미 존재하는 닉네임입니다. 다른 이름을 입력해주세요.");
          setIsNicknameValid(false);
        } else {
          alert("닉네임은 영문만 가능합니다. 다시 확인해주세요.");
          setIsNicknameValid(false);
        }
      } else {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    } 
  };

  const handleNextClick = () => {
    localStorage.setItem('tempNickname', nickname);
    localStorage.setItem('gender', gender);
    localStorage.setItem('age', age);
    localStorage.setItem('season', season);
    
    navigate('/changelikeScent', {
      state: {
        originLikedScents,
        originDislikedScents
      }
    });
  };

  const handleSeasonClick = (selectedSeason) => {
    setSeason(seasonMapping[selectedSeason]); // 서버로 보낼 값을 설정
    setClickedButton(selectedSeason); // 화면에 표시할 값을 설정
  };

  return (
    <MainContainer>
      <Title><Scentasy>Scentasy</Scentasy>에 오신 것을 환영해요!</Title>
      <FormContainer>
        <Label>닉네임 *</Label>
        <InfoContainer>
          <Input type="text"
          placeholder="닉네임을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          />
          <AddInfoButton
            onClick={handleNicknameCheck}
            isValid={isNicknameValid}  // 상태에 따라 스타일 변경
          >중복 확인</AddInfoButton>
        </InfoContainer>
      </FormContainer>
      <FormContainer>
        <Label>선호하는 향수 성별 *</Label>
        <InfoContainer>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
            <option value="BOTH">중성</option>
          </Select>
        </InfoContainer>
      </FormContainer>
      <FormContainer>
        <Label>연령대 *</Label>
        <InfoContainer>
          <Select
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="AGE10">10대</option>
            <option value="AGE20">20대</option>
            <option value="AGE30">30대</option>
            <option value="AGE40">40대</option>
            <option value="AGE50">50대</option>
            <option value="AGE60">60대</option>
            <option value="60대 이상">60대 이상</option>
          </Select>
        </InfoContainer>
      </FormContainer>
      <FormContainer>
        <Label>선호하는 계절 *</Label>
        <InfoContainer>
        <SeasonButton
            active={clickedButton === "봄"}
            onClick={() => handleSeasonClick("봄")}
          >
            봄
          </SeasonButton>
          <SeasonButton
            active={clickedButton === "여름"}
            onClick={() => handleSeasonClick("여름")}
          >
            여름
          </SeasonButton>
          <SeasonButton
            active={clickedButton === "가을"}
            onClick={() => handleSeasonClick("가을")}
          >
            가을
          </SeasonButton>
          <SeasonButton
            active={clickedButton === "겨울"}
            onClick={() => handleSeasonClick("겨울")}
          >
            겨울
          </SeasonButton>
        </InfoContainer>
      </FormContainer>
      <NextButton onClick={handleNextClick}>다음으로 이동하기</NextButton>
    </MainContainer>
  )
};

export default ChangeAddInfoPage;