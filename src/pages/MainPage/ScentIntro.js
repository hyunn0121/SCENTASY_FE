import React from "react";
import styled from "styled-components";
import  { images } from "../../pages/Auth/scentData";

import example_scent_img from '../../assets/images/Flavors/aqua.jpg';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0px;
`;

const MainContent = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HighlightTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #00656D;
  text-align: center;
  margin-bottom: 5px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 5px;
  row-gap: 20px;
  margin-top: 40px;
`;

const ScentCard = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
  border-radius: 10px 10px 0 0;
`;

const ScentImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 20px 20px 0 0;
  object-fit: cover;
  margin-bottom: 10px;
`;

const ScentTitle = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  margin: 0 0 0 0;
`;

const ScentGroup = styled.p`
  font-size: 12px;
  font-family: "Montserrat-Regular";
  margin: 0 0 10px 0;
`;

const ScentDescription = styled.p`
  font-size: 14px;
  font-family: "Montserrat-Regular";
  margin: 0 0 10px 0;
  color: #666666;
  text-align: left;
`;


const ScentIntro = () => {
  return (
    <MainContainer>
      <MainContent>
        <TitleContainer>
          <HighlightTitle>궁금하신 향료</HighlightTitle><Title>에 대한</Title>
        </TitleContainer>
          <Title>정보를 알려드립니다!</Title><br/>
        <GridContainer>
          {images.map((scent, index) => (
            <ScentCard key={index}>
            <ScentImage src={scent.src} alt={scent.label}/>
            <ScentTitle>{scent.label}</ScentTitle>
            <ScentGroup>Group Unknown</ScentGroup>
            <ScentDescription>{scent.tooltip}</ScentDescription>
          </ScentCard>
          ))}
        </GridContainer>
      </MainContent>
    </MainContainer>
  )
};

export default ScentIntro;