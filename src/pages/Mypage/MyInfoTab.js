import React from "react";
import { useState } from "react";
import styled from "styled-components";

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

const MyInfoTab = () => {

  // 서버에서 받아오는 데이터
  const nickname = "dodo";
  const age = "20대"
  const gender = "여성"
  const season = "봄"

  const likedScents = [
    { name: "장미", imageUrl: "rose.png" },
    { name: "로즈마리", imageUrl: "rosemary.png" },
    { name: "샌달우드", imageUrl: "rosemary.png" },
    { name: "바닐라", imageUrl: "rosemary.png" },
    { name: "화이트머스크", imageUrl: "rosemary.png" },
  ]

  const unlikedScents = [
    { name: "장미", imageUrl: "rose.png" },
    { name: "로즈마리", imageUrl: "rosemary.png" },
    { name: "샌달우드", imageUrl: "rosemary.png" },
    { name: "바닐라", imageUrl: "rosemary.png" },
    { name: "화이트머스크", imageUrl: "rosemary.png" },
  ]

  // 이미지 경로를 로컬 또는 서버에서 받아올 수 있게 구성
  const getImagePath = (imageName) => {
    return `/path_to_images/${imageName}`; // 이미지 경로를 서버 또는 로컬 경로에 맞게 설정
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
          <InfoNormalText>{nickname}님은 </InfoNormalText><InfoHighlightText>{age}</InfoHighlightText>
          <InfoNormalText>, 선호하는 향수 성별은 </InfoNormalText><InfoHighlightText>{gender}</InfoHighlightText>
          <InfoNormalText>이시며, </InfoNormalText><br/>
          <InfoNormalText>계절은 </InfoNormalText><InfoHighlightText>{season}</InfoHighlightText>
          <InfoNormalText>을 가장 좋아하시는군요!</InfoNormalText>
        </PreferenceContainer>

        <ScentPreferenceContainer>
          <ScentPreferenceTitle >{nickname}님이 </ScentPreferenceTitle><ScentPreferenceHighlight>좋아하시는 향</ScentPreferenceHighlight>
          <ScentImageContainer>
            {likedScents.map((scent, index) => (
              <ScentItem key={index}>
                <ScentImage src={rose} alt={scent.name} />
                <ScentName>{scent.name}</ScentName>
              </ScentItem>
            ))}
          </ScentImageContainer>
        </ScentPreferenceContainer>
        <ScentPreferenceContainer>
          <ScentPreferenceTitle>{nickname}님이 </ScentPreferenceTitle><ScentPreferenceHighlight>싫어하시는 향</ScentPreferenceHighlight>
          <ScentImageContainer>
            {unlikedScents.map((scent, index) => (
              <ScentItem key={index}>
                <ScentImage src={rose} alt={scent.name} />
                <ScentName>{scent.name}</ScentName>
              </ScentItem>
            ))}
          </ScentImageContainer>
        </ScentPreferenceContainer>
      </MainInfoContainer>

      <ChangeButtonContainer>
        <ChangeButton>취향정보 수정하기</ChangeButton>
      </ChangeButtonContainer>
    </MyInfoTabContainer>
  )

};

export default MyInfoTab