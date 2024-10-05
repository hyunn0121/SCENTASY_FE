import React from "react";
import { useState } from "react";
import styled from "styled-components";

import ic_like from '../../assets/images/ic_like.png';
import ic_unlike from '../../assets/images/ic_unlike.png';
import ic_comment from '../../assets/images/ic_comment.png';

const MyPostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MyPostItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const PostTitle = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Bold";
  margin: 0;
`;

const PostContent = styled.p`
  width: 100%;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const PostExtraInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justfiy-content: flex-start;
  align-items: center;
`;

const PostExtraInfoIcon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
  object-fit: contain;
`;

const PostExtraInfoText = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #808080;
  padding: 0px 10px 0px 3px;
`;

const PostHourText = styled.p`
  font-size: 10px;
  font-family: "Pretendard-Thin";
  color: #808080;
`;

const MyPostTab = () => {
  return (
    <MyPostContainer>
      <MyPostItemContainer>
        <PostTitle>나만의 향수 조합</PostTitle>
        <PostContent>저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...</PostContent>
        <PostInfoContainer>
          <PostExtraInfoContainer>
            <PostExtraInfoIcon src={ic_unlike}/>
            <PostExtraInfoText>20</PostExtraInfoText>
            <PostExtraInfoIcon src={ic_comment}/>
            <PostExtraInfoText>155</PostExtraInfoText>
          </PostExtraInfoContainer>
          <PostHourText>2024. 09. 04</PostHourText>
        </PostInfoContainer>
      </MyPostItemContainer>
    </MyPostContainer>
  )
};

export default MyPostTab;