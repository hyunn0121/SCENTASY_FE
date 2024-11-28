import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import apiClient from "../Auth/TokenReissue";

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
  text-align: left;
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

  const [myPostList, setMyPostList] = useState([]);

  // 내 글 목록
  useEffect(() => {
    const fetchMyPostList = async () => {

      const memberId = localStorage.getItem('memberId');

      try {
        const response = await apiClient.get(`/api/posts/list/${memberId}`);
        console.log(`멤버별 포스트 조회: ${response}`)

        if (response.status === 200) {
          const { code, data } = response.data;

          if (code === '0000') {
            setMyPostList(data);
          }
        }
      } catch (error) {
        console.log('멤버별 포스트 목록을 불러오는 중 오류 발생', error);
      }
    };

    fetchMyPostList();
  }, []);

  // 내 댓글 목록


  
  return (
    <MyPostContainer>
      {myPostList.map((post, index) => (
        <MyPostItemContainer key={index}>
        <PostTitle>{post.title}</PostTitle>
        <PostContent>{post.content}</PostContent>
        <PostInfoContainer>
          <PostExtraInfoContainer>
            <PostExtraInfoIcon src={ic_unlike}/>
            <PostExtraInfoText>{post.likeCount}</PostExtraInfoText>
            <PostExtraInfoIcon src={ic_comment}/>
            <PostExtraInfoText>{post.commentCount}</PostExtraInfoText>
          </PostExtraInfoContainer>
          <PostHourText>{post.createdAt}</PostHourText>
        </PostInfoContainer>
      </MyPostItemContainer>
      ))}
    </MyPostContainer>
  )
};

export default MyPostTab;