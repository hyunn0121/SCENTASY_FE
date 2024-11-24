import React from "react";
import styled from "styled-components";

import example_profile from '../../assets/images/default_profile_image.png';
import ic_like from '../../assets/images/ic_like.png';
import ic_unlike from '../../assets/images/ic_unlike.png';
import ic_comment from '../../assets/images/ic_comment.png';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 50px;
  margin-bottom: 50px;
`;

const PostTitle = styled.p`
  font-size: 28px;
  font-family: "Pretendard-Bold";
  text-align: left;
  margin: 0;
`;

const PostDate = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin: 10px 0px 40px 0px;
`;

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
`;

const UserProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const UserNickname = styled.p`
  font-size: 24px;
  font-family: "Pretendard-SemiBold";
  margin: 0px 10px 0px 0px;
`;

const UserExtraInfo = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
`;

const PostMainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justfiy-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
`;

const PostContentContainer = styled.div`
  width: 40%;
  height: 400px;
  padding: 30px;
  border-radius: 20px;
  border: 3px solid #E9E9E9;
`;

const PostContent = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  text-align: left;
  line-height: 1.8;
`;

const PerfumeInfoContainer = styled.div`
  width: 40%;
  height: 400px;
  padding: 25px;
  border-radius: 20px;
  border: 3px solid #FFCACA;
  background-color: #FFCACA;
  opacity: 20%;
`;

const PostExtraInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justfiy-content: flex-start;
  align-items: center;
`;

const PostExtraInfoIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  object-fit: cover;
`;

const PostExtraInfoText = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #808080;
  padding: 0px 15px 0px 5px;
`;

const Divider = styled.hr`
  width: 90%;
  height: 2px;
  border: none;
  background-color: #E6E6E6;
  margin: 20px 10px 20px 10px;
`;

const DetailPost = () => {

  const example_content = `"면접 전날 너무 긴장되는 마음에 긴장을 풀어줄 수 있는 향수를 제작했습니다.
편안함을 주면서 너무 튀지 않는 향수를 원했고, 머스크와 우디함을 추가해 차분함이 강조됐습니다.
향수를 뿌린 덕인지 긴장하지 않고 면접에서 하고싶은 말을 다 하고왔습니다!
혹시나 면접날 향수를 고민하고 계시면 이 향수 추천드립니다.
댓글 남겨주시면 정확한 정보 알려드릴게요!"`;

  return(
    <MainContainer>
      <PostTitle>예시 제목 1</PostTitle>
      <PostDate>2024.09.04</PostDate>

      <UserInfoContainer>
        <UserProfile src={example_profile} />
        <UserNickname>dodo</UserNickname>
        <UserExtraInfo>20대 · 여성 · 봄</UserExtraInfo>
      </UserInfoContainer>

      <PostMainContainer>
        <PostContentContainer>
          <PostContent>{example_content}</PostContent>
        </PostContentContainer>
        <PerfumeInfoContainer></PerfumeInfoContainer>
      </PostMainContainer>

      <PostExtraInfoContainer>
        <PostExtraInfoIcon src={ic_unlike} alt="Like" />
        <PostExtraInfoText>125</PostExtraInfoText>
        <PostExtraInfoIcon src={ic_comment} alt="Comment" />
        <PostExtraInfoText>63</PostExtraInfoText>
      </PostExtraInfoContainer>

      <Divider />
    </MainContainer>
  )
};

export default DetailPost;