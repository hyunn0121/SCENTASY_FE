import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import ic_close from '../../assets/images/ic_close.png';
import ic_memo from '../../assets/images/ic_memo.png';

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

const PerfumeTitle = styled.div`
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

const PerfumeDate = styled.p`
  font-size: 16px;
  font-family: "Montserrat-Regular";
  color: #666666;
  margin: 5px 0px 20px 0px;
`;

const MemoContainer = styled.div`
  width: 80%;
  background-color: #FAF8F1;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px; /* 각 MemoContainer 사이에 10px 간격을 추가 */
  
  &:last-child {
    margin-bottom: 0; /* 마지막 MemoContainer의 margin-bottom 제거 */
  }
`;

const MemoIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const MemoContent = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  margin: 0px 10px;
  text-align: left;
`;

const MemoDetailModal = ({ title, date, memos, onClose }) => {
  
  const formattedDate = date ? new Date(date).toISOString().split('T')[0] : "날짜 없음";
  console.log("제목: ", title);
  console.log("날짜: ", date);

  return(
    <ModalOverlay>
      <ModalContainer>
        <TitleContainer>
          <PerfumeTitle>{title}</PerfumeTitle>
          <CloseButton src={ic_close} onClick={onClose}/>
        </TitleContainer>
        <PerfumeDate>{formattedDate}</PerfumeDate>
          {memos.length > 0 ? (
            memos.map((memo, index) => (
              <MemoContainer key={index}>
                <MemoIcon src={ic_memo}/>
                <MemoContent >{memo.content}</MemoContent>
              </MemoContainer>
            ))
          ) : (
            <p>메모가 없습니다.</p>
          )}
      </ModalContainer>
    </ModalOverlay>
  )


};

export default MemoDetailModal;