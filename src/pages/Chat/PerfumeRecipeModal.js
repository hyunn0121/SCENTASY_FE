import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import apiClient from "../Auth/TokenReissue";

import ic_close from '../../assets/images/ic_close.png';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 400px;
  height: 500px;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify: center;
  align-items: center;
  position: relative;
`;

const PerfumeRecipeTitle = styled.p`
  font-size: 24px;
  font-family: "Pretendard-Bold";
  margin: 0 auto;
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const PerfumeRecipeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: center;
  margin: 10px;
`;

const PerfumeTitle = styled.p`
  font-size: 20px;
  font-family: "Montserrat-SemiBold";
  text-align: center;
  margin: 0px 0px 10px 0px;
`;

const PerfumeDescription = styled.p`
  font-size: 16px;
  font-family: "Montserrat-Regular";
  text-align: left;
  color: #808080;
  margin: 0px 0px 10px 0px;
`;

const PerfumeRecipeNoteGuide = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
`;

const PerfumeRecipe = styled.p`
  font-size: 14px;
  font-family: "Montserrat-SemiBold";
  text-align: center;
  margin: 0px 0px 5px 0px;
`;

const PerfumeMakeButton = styled.button`
  width: 80%;
  font-size: 14px;
  font-family: "Pretendard-SemiBold";
  border: 2px solid #00656D;
  border-radius: 8px;
  background-color: #ffffff;
  color: #00656D;
  cursor: pointer;
  text-align: center;
  padding: 10px 25px 10px 25px;
  margin-bottom: 10px;

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;


const PerfumeRecipeModal = ({ recipe, onClose, onMake }) => {

  console.log("향수 레시피: ", recipe);
  console.log("향수 레시피 제목: ", recipe.title);
  console.log("향수 레시피 설명: ", recipe.description);

  const title = "생일의 향기";
  const description = "'생일의 향기'는 생일의 즐거움과 기쁨을 향기로 표현한 향수입니다. 상쾌한 시트러스의 향이 기분을 더욱 밝게 만들어주고, 그 뒤를 이어 화이트 머스크의 따뜻하고 포근한 향이 깊은 행복을 감싸줍니다. 생일 파티를 더욱 빛나게 해줄 이 향수는 맑은 가을 날, 즐거운 친구들과 함께하는 특별한 순간을 아름답게 기억하게 해줄 것입니다.";

  // 향수 만들기 버튼 클릭
  const handlePerfumeMakeClick = async () => {
    try {
      const perfumeId = recipe.perfumeId;
      // const perfumeId = 1;

      if (!perfumeId) {
        throw new Error('향수 ID가 없습니다.');
      }

      const response = await apiClient.get(`/api/perfume/device/${perfumeId}`);

      if (response.code === '0000') {
        console.log('향수 만들기 api 요청 성공', response.data);
        alert('향수 만들기 성공');
        onMake(); // 로딩 모달 띄우기
      } else {
        throw new Error('향수 만들기 오류 : ', response.statusText);
      }
    } catch (error) {
      console.error('향수 만들기 요청 실패 :', error);
      alert('향수 만들기 요청이 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <TitleContainer>
          <PerfumeRecipeTitle>향수 레시피</PerfumeRecipeTitle>
          <CloseButton src={ic_close} onClick={onClose}/>
        </TitleContainer>
        <PerfumeRecipeContainer>
          <PerfumeTitle>{title}</PerfumeTitle>
          <PerfumeDescription>{description}</PerfumeDescription>
          <PerfumeRecipeNoteGuide>Note 구성</PerfumeRecipeNoteGuide>
          {recipe.notes && recipe.notes.length > 0 ? (
            recipe.notes.map((note, index) => (
              <PerfumeRecipe>{note}</PerfumeRecipe>
            ))
          ) : (
            <PerfumeRecipe>레시피 정보가 없습니다.</PerfumeRecipe>
          )}
        </PerfumeRecipeContainer>
        <PerfumeMakeButton onClick={handlePerfumeMakeClick}>향수 만들기</PerfumeMakeButton>
      </ModalContainer>
    </ModalOverlay>
  )

};

export default PerfumeRecipeModal;