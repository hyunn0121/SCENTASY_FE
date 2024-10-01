import React from "react";
import { useState } from "react";
import styled from "styled-components";

const MyPerfumeTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const MainPerfumeContainer = styled.div`
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

const PerfumeTitle = styled.h1`
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

const PerfumeTab = () => {
  return(
    <MyPerfumeTabContainer>
      <TitleContainer>
        <PerfumeTitle>나의 향수 로그</PerfumeTitle>
        <TitleDescription>Get summary of your preference information here.</TitleDescription>
      </TitleContainer>
      <Divider/>

      <MainPerfumeContainer>
      </MainPerfumeContainer>
    </MyPerfumeTabContainer>
  )
};

export default PerfumeTab;