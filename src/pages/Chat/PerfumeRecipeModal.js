import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

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
  height: 400px;
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

const PerfumeRecipeTitle = styled.div`
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
  margin: 10px;
`;

const PerfumeRecipe = styled.p`
  font-size: 16px;
  font-family: "Montserrat-SemiBold";
  text-align: center;
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
  return (
    <ModalOverlay>
      <ModalContainer>
        <TitleContainer>
          <PerfumeRecipeTitle>향수 레시피</PerfumeRecipeTitle>
          <CloseButton src={ic_close} onClick={onClose}/>
        </TitleContainer>
        <PerfumeRecipeContainer>
          {recipe && recipe.length > 0 ? (
            recipe.map((note, index) => (
              <PerfumeRecipe>{note}</PerfumeRecipe>
            ))
          ) : (
            <PerfumeRecipe>레시피 정보가 없습니다.</PerfumeRecipe>
          )}
        </PerfumeRecipeContainer>
        <PerfumeMakeButton onClick={onMake}>향수 만들기</PerfumeMakeButton>
      </ModalContainer>
    </ModalOverlay>
  )

};

export default PerfumeRecipeModal;