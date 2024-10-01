import React from "react";
import { useState } from "react";
import styled from "styled-components";

import ic_unlike from "../../assets/images/ic_unlike.png";
import ic_like from "../../assets/images/ic_like.png";
import ic_comment from "../../assets/images/ic_comment.png";
import example_profile from "../../assets/images/example_profile.jpg";

const MyCommunityTabContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const MainCommunityContainer = styled.div`
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

const CommunityTitle = styled.h1`
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

const TabMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const TabButton = styled.button`
  background-color: transparent;
  color: ${(props) => (props.active ? "#FFFFFF" : "#00656D")};
  border: none;
  border-bottom: ${(props) => (props.active ? "3px solid #00656D" : "none")};
  font-size: 16px;
  font-family: "Pretendard-Bold";
  color: ${(props) => (props.active) ? "#00656D" : "#000000"};
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #00656D;
    color: #FFFFFF;
  }

  & + & {
    margin-left: 10px;
  }
`;

const CommunityContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 10px;
`;

const PostItemList = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const PostTitle = styled.p`
  max-width: 80%;
  font-size: 16px;
  font-family: "Pretendard-Bold";
  margin: 0px 0px 5px 0px;
`;

const PostContent = styled.p`
  max-width: 80%;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  margin: 0px 0px 5px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostInfonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0px;
`;

const LikeAndCommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LikeAndCommentIcon = styled.img`
  width: 21px;
  height: 20px;
  object-fit: contain;
  margin-right: 3px;
`;

const LikeAndCommentCountText = styled.p`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin-right: 10px;
`;

const DateAndViewCountText = styled.p`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin-right: 10px;
`;

const PostItemDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid #E6E6E6;
`;

// 내 댓글 목록
const CommentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 10px;
`;

const CommentItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;

const PostOwnInfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direciton: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const PostOwnProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: none;
`;

const PostOwnNickNameAndTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start;
  margin-left: 20px;
  display: inline;
`;

const PostOwnNickNameContainer = styled.div`
  display: flex;
  flex-direciton: row;
  align-items: center;
`;

const PostOwnNickNameText = styled.p`
  font-size: 12px;
  font-family: "Pretendard-SemiBold";
  color: #808080;
  margin: 0px;
`;

const PostOwnGuideText = styled.p`
  font-size: 12px;
  font-family: "Pretendard-SemiBold";
  color: #000000;
  margin: 0px;
`;

const CommentContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const CommentContent = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  margin: 0px 0px 5px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// 내 좋아요 목록
const LikeListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 450px;
  overflow-y: auto;
  padding-right: 10px;
`;

const LikeItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 20px;
`;


const CommunityTab = () => {
  const [activeTab, setActiveTab] = useState("myPosts");

  const posts = [
    { id: 1, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", likes: 155, comments: 15, date: "2024.09.04", views: 3344 },
    { id: 2, title: "데일리 향수 추천~!", content: "저만의 데일리 향수 추천!", likes: 200, comments: 20, date: "2024.09.03", views: 4000 },
    { id: 3, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", likes: 155, comments: 15, date: "2024.09.04", views: 3344 },
    { id: 4, title: "데일리 향수 추천~!", content: "저만의 데일리 향수 추천!", likes: 200, comments: 20, date: "2024.09.03", views: 4000 },
    { id: 5, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", likes: 155, comments: 15, date: "2024.09.04", views: 3344 },
    { id: 6, title: "데일리 향수 추천~!", content: "저만의 데일리 향수 추천!", likes: 200, comments: 20, date: "2024.09.03", views: 4000 },
  ]

  const commentPost = [
    { id: 1, title: "나만의 향수 조합 공유!", comment: "우와 향수 꿀조합 공유라니! 너무 좋아요!!! xx님의 꿀조합 향수 너무 궁금해서 저도 얼른 만들어봐야겠어요! 언젠가 저도 꿀조합 향수를 찾을 수 있기를 !!!!", nickname: "전세계향수다써볼때까지", date: "2024.09.04", commentCount: 5 },
    { id: 2, title: "나만의 향수 조합 공유!", comment: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", date: "2024.09.04", commentCount: 7 },
    { id: 3, title: "나만의 향수 조합 공유!", comment: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", date: "2024.09.04", commentCount: 7 },
    { id: 4, title: "나만의 향수 조합 공유!", comment: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", date: "2024.09.04", commentCount: 7 },
  ]

  const likePost = [
    { id: 1, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", likes: 155, comments: 15, date: "2024.09.04", commentCount: 5 },
    { id: 2, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", likes: 155, comments: 15, date: "2024.09.04", commentCount: 7 },
    { id: 3, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", likes: 155, comments: 15, date: "2024.09.04", commentCount: 7 },
    { id: 4, title: "나만의 향수 조합 공유!", content: "저만의 꿀향수 조합을 공유합니다! 제 취향은 대체로 달달하고 상큼한 취향 ...", nickname: "전세계향수다써볼때까지", likes: 155, comments: 15, date: "2024.09.04", commentCount: 7 },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "myPosts":
        return (
          <PostListContainer>
            {posts.map((posts) => (
              <PostItemList key={posts.id}>
                <PostTitle>{posts.title}</PostTitle>
                <PostContent>{posts.content}</PostContent>
                <PostInfonContainer>
                  <LikeAndCommentContainer>
                    <LikeAndCommentIcon src={ic_unlike}/>
                    <LikeAndCommentCountText>{posts.likes}</LikeAndCommentCountText>
                    <LikeAndCommentIcon src={ic_comment}/>
                    <LikeAndCommentCountText>{posts.comments}</LikeAndCommentCountText>
                  </LikeAndCommentContainer>
                  <DateAndViewCountText>{posts.date} · {posts.views} views</DateAndViewCountText>
                </PostInfonContainer>

              </PostItemList>
            ))}
          </PostListContainer>
        );
      case "myComments" :
        return (
          <CommentListContainer>
            {commentPost.map((posts) => (
              <CommentItemList key={posts.id}>
                <PostOwnInfoContainer>
                  <PostOwnProfileImage src={example_profile}/>
                  <PostOwnNickNameAndTitleContainer>
                    <PostTitle>{posts.title}</PostTitle>
                    <PostOwnNickNameContainer>
                      <PostOwnNickNameText>{posts.nickname}</PostOwnNickNameText><PostOwnGuideText>님</PostOwnGuideText>
                    </PostOwnNickNameContainer>
                  </PostOwnNickNameAndTitleContainer>
                </PostOwnInfoContainer>
                <CommentContainer>
                  <CommentContent>└&nbsp;&nbsp;</CommentContent>
                  <CommentContent>{posts.comment}</CommentContent>
                </CommentContainer>
                <DateAndViewCountText>{posts.date} · {posts.commentCount} comments</DateAndViewCountText>
              </CommentItemList>
            ))}
          </CommentListContainer>
        )
      case "myLikes" :
        return (
          <LikeListContainer>
            {likePost.map((posts) => (
              <LikeItemList key={posts.id}>
                <PostOwnInfoContainer>
                  <PostOwnProfileImage src={example_profile}/>
                  <PostOwnNickNameAndTitleContainer>
                    <PostTitle>{posts.title}</PostTitle>
                    <PostOwnNickNameContainer>
                      <PostOwnNickNameText>{posts.nickname}</PostOwnNickNameText><PostOwnGuideText>님</PostOwnGuideText>
                    </PostOwnNickNameContainer>
                  </PostOwnNickNameAndTitleContainer>
                </PostOwnInfoContainer>
                <PostContent>{posts.content}</PostContent>
                <PostInfonContainer>
                  <LikeAndCommentContainer>
                    <LikeAndCommentIcon src={ic_like}/>
                    <LikeAndCommentCountText>{posts.likes}</LikeAndCommentCountText>
                    <LikeAndCommentIcon src={ic_comment}/>
                    <LikeAndCommentCountText>{posts.comments}</LikeAndCommentCountText>
                  </LikeAndCommentContainer>
                  <DateAndViewCountText>{posts.date}</DateAndViewCountText>
                </PostInfonContainer>

              </LikeItemList>
            ))}
          </LikeListContainer>
        )
      default:
        return <p>내 글 목록이 여기에 표시됩니다.</p>;
    };

  }
  return (
    <MyCommunityTabContainer>
      <TitleContainer>
        <CommunityTitle>커뮤니티 로그</CommunityTitle>
        <TitleDescription>Get summary of your preference information here.</TitleDescription>
      </TitleContainer>
      <Divider/>

      <MainCommunityContainer>
        <TabMenu>
          <TabButton active={activeTab === "myPosts"} onClick={() => setActiveTab("myPosts")}>
            내 글 목록
          </TabButton>
          <TabButton active={activeTab === "myComments"} onClick={() => setActiveTab("myComments")}>
            내 댓글 목록
          </TabButton>
          <TabButton active={activeTab === "myLikes"} onClick={() => setActiveTab("myLikes")}>
            내 좋아요 목록
          </TabButton>
        </TabMenu>

        <CommunityContent>{renderContent()}</CommunityContent>
      </MainCommunityContainer>
    </MyCommunityTabContainer>
  )
};

export default CommunityTab;