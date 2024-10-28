import React from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  width: 70%; /* 원하는 비율 설정 */
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PostTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const PostTitleGuide = styled.h1`
  font-size: 28px;
  font-family: "Pretendard-Bold";
  text-align: left;
  margin: 0;
`;

const Divider = styled.hr`
  width: 80vw;
  border: none;
  border-top: 1px solid #E6E6E6;
  margin: 20px 10px 20px 10px;
`;

const TitleLabelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin
`;

const TitleLabel = styled.p`
  font-size: 20px;
  font-family: "Pretendard-SemiBold";
  text-align: left;
  margin: 10px 10px 20px 0px;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 20px;
  padding: 15px;
  border: 3px solid #00656D;
  border-radius: 10px;
  font-size: 20px;
  font-family: "Montserrat-Regular";
  box-sizing: border-box;
  outline: none;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 500px;
  margin-bottom: 15px;
  padding: 15px;
  border: 3px solid #00656D;
  border-radius: 10px;
  font-size: 18px;
  font-family: "Montserrat-Regular";
  box-sizing: border-box;
  outline: none;
`;

const ButtonContanier = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 100px;
`;

const SubmitPostButton = styled.button`
  width: 90px;
  font-size: 20px;
  font-family: "Pretendard-SemiBold";
  color: #ffffff;
  background-color: #00656D;
  border: none;
  border-radius: 10px;
  padding: 10px;
`;

const WritePost = () => {
  return (
    <MainContainer>
      <PostTitleContainer>
        <PostTitleGuide>공유할 당신의 향수를 선택하세요!</PostTitleGuide>
        <Divider/>
      </PostTitleContainer>

      <PostTitleContainer>
        <PostTitleGuide>당신의 향수에 대해 공유해주세요!</PostTitleGuide>
        <Divider/>
      </PostTitleContainer>

      <TitleLabelContainer>
        <TitleLabel>제목</TitleLabel>
      </TitleLabelContainer>
      <TitleInput placeholder="제목을 입력해주세요" />

      <TitleLabelContainer>
        <TitleLabel>내용</TitleLabel>
      </TitleLabelContainer>
      <ContentInput placeholder="내용을 입력해주세요" />

      <ButtonContanier>
        <SubmitPostButton>글 등록</SubmitPostButton>
      </ButtonContanier>
    </MainContainer>
  );
}

export default WritePost;