import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import qs from 'qs';

import rose from '../../assets/images/Flavors/rose.jpg';

const MyInfoTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const MainInfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 50px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
`;

const MyInfoTitle = styled.h1`
  font-size: 28px;
  font-family: "Pretendard-Bold";
  margin: 0px;
`;

const TitleDescription = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin: 0px 0px 5px 15px;
`;

const Divider = styled.hr`
  width: 500px;
  border: none;
  border-top: 2px solid #000000;
  margin: 10px 0px 50px 0px;
`;

const PreferenceContainer = styled.div`
  justify-content: flex-start;
  align-items: flex-start;
  line-height: 1.8;
  margin-bottom: 30px;
`;

const InfoNormalText = styled.span`
  font-size: 24px;
  font-family: "Pretendard-Bold";
  line-height: 1.8;
`;

const InfoHighlightText = styled.span`
  font-size: 24px;
  font-family: "Pretendard-Bold";
  color: #00656D;
  line-height: 1.8;
`;

const ScentPreferenceContainer = styled.div`
  margin-bottom: 15px;
`;

const ScentPreferenceTitle = styled.span`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
`;

const ScentPreferenceHighlight = styled.span`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  color: #00656D;
`;

const ScentTitle = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  margin: 10px 0px;
`;

const ScentImageContainer = styled.div`
  display: flex;
  gap: 20px; /* 아이템 사이 간격 */
  margin-top: 30px;
`;

const ScentItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScentImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom 10px;
`;

const ScentName = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  margin: 10px 0px;
`;

const ChangeButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  margin-top: 20px;
`;

const ChangeButton = styled.div`
  width: 120px;
  border: 2px solid #00656D;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #00656D;
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  padding: 10px 25px 10px 25px;

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const MyInfoTab = ({ nickname, age, gender, season, likedScents = [], dislikedScents = []}) => {
  const navigate = useNavigate();
  const [likedImages, setLikedImages] = useState([]);
  const [dislikedImages, setDislikedImages] =useState([]);

  const fetchScentImages = async (scents) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      scents.forEach((scent) => params.append("scents", scent));


      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/api/s3/scent-images?${params.toString()}`,{
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          // 응답 상태가 200이 아닌 경우 오류 처리
          console.error("서버 응답 오류:", response.status);
          return [];
        }

        const data = await response.json();
        if (data.code === "0000") {
          return data.data; // 이미지 URL 목록 반환
        }
    } catch (error) {
      console.error("이미지 조회 오류: ", error);
    }
    return [];
  };

  useEffect(() => {
    const likedScentsEnglish = likedScents.map(scent => scent.english);
    const dislikedScentsEnglish = dislikedScents.map(scent => scent.english);

    // 좋아하는 향기 이미지 조회
    fetchScentImages(likedScentsEnglish).then((urls) => {
      setLikedImages(urls);
    });

    // 싫어하는 향기 이미지 조회
    fetchScentImages(dislikedScentsEnglish).then((urls) => {
      setDislikedImages(urls);
    });
  }, [likedScents, dislikedScents]);

  // 취향 정보 수정 버튼
  const handleChangeInfo = () => {
    navigate('/ChangeAddInfo', {
      state: {
        originNickname: nickname,
        originAge: age,
        originGender: gender,
        originSeason: seasonMap[season],
        originLikedScents: likedScents,
        originDislikedScents: dislikedScents
      }
    });
  };

  const genderMap = {
    FEMALE: "여성",
    MALE: "남성",
    BOTH: "중성",
  };

  const ageMap = {
    AGE10: "10대",
    AGE20: "20대",
    AGE30: "30대",
    AGE40: "40대",
    AGE50: "50대",
    AGE60: "60대",
  };
  
  const seasonMap = {
    SPRING: "봄",
    SUMMER: "여름",
    FALL: "가을",
    WINTER: "겨울",
  };

  return(
    <MyInfoTabContainer>
      <TitleContainer>
        <MyInfoTitle>취향 정보</MyInfoTitle>
        <TitleDescription>Get summary of your preference information here.</TitleDescription>
      </TitleContainer>
      <Divider/>

      <MainInfoContainer>
        <PreferenceContainer>
          <InfoNormalText>{nickname}님은 </InfoNormalText><InfoHighlightText>{ageMap[age]}</InfoHighlightText>
          <InfoNormalText>, 선호하는 향수 성별은 </InfoNormalText><InfoHighlightText>{genderMap[gender]}</InfoHighlightText>
          <InfoNormalText>이시며, </InfoNormalText><br/>
          <InfoNormalText>계절은 </InfoNormalText><InfoHighlightText>{seasonMap[season]}</InfoHighlightText>
          <InfoNormalText>을 가장 좋아하시는군요!</InfoNormalText>
        </PreferenceContainer>

        <ScentPreferenceContainer>
          <ScentPreferenceTitle >{nickname}님이 </ScentPreferenceTitle><ScentPreferenceHighlight>좋아하시는 향</ScentPreferenceHighlight>
          <ScentImageContainer>
            {likedScents.map((scent, index) => (
              <ScentItem key={index}>
                <ScentImage src={likedImages[index] || rose} alt={scent} />
                <ScentName>{scent.korean}</ScentName>
              </ScentItem>
            ))}
          </ScentImageContainer>
        </ScentPreferenceContainer>
        <ScentPreferenceContainer>
          <ScentPreferenceTitle>{nickname}님이 </ScentPreferenceTitle><ScentPreferenceHighlight>싫어하시는 향</ScentPreferenceHighlight>
          <ScentImageContainer>
            {dislikedScents.map((scent, index) => (
              <ScentItem key={index}>
                <ScentImage src={dislikedImages[index] || rose} alt={scent} />
                <ScentName>{scent.korean}</ScentName>
              </ScentItem>
            ))}
          </ScentImageContainer>
        </ScentPreferenceContainer>
      </MainInfoContainer>

      <ChangeButtonContainer>
        <ChangeButton onClick={handleChangeInfo}>
          취향정보 수정하기
          </ChangeButton>
      </ChangeButtonContainer>
    </MyInfoTabContainer>
  )

};

export default MyInfoTab