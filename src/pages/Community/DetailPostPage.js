import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../Auth/TokenReissue";
import styled from "styled-components";
import { format } from "date-fns";

import example_profile from '../../assets/images/default_profile_image.png';
import ic_like from '../../assets/images/ic_like.png';
import ic_unlike from '../../assets/images/ic_unlike.png';
import ic_comment from '../../assets/images/ic_comment.png';
import ic_3dot from '../../assets/images/ic_3dot.png';

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 50px;
  margin-bottom: 100px;
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

const CommentGuide = styled.p`
  font-size: 20px;
  font-family: "Pretendard-Bold";
  margin: 0px 0px 40px 10px;
`;

const CommentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justfiy-content: flex-start;
  align-items: flex-start;
  padding: 0px 20px 0px 20px;
  gap: 40px;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CommentUserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  margin-right: 15px;
  object-fit: cover;
`;

const CommentUserAndDate = styled.div`
  display: flex;
  flex-direction: column;
  justfiy-content: flex-start;
  align-items: flex-start;
  gap: 5px;
  margin-right: 30px;
`;

const CommentUserNickName = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  margin: 0;
`;

const CommentDate = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #666666;
  margin: 0;
`;

const CommentContent = styled.p`
  width: 70%;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  line-height: 1.5;
  margin: 0;
  text-align: left;
`;

const ReplyButton = styled.button`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #00656D;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #00656D;
  margin-left: 15px;

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const SettingComment = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  object-fit: contain;
  margin-left: 10px;
`;

const CommentWriterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`;

// 검색 입력창 스타일
const CommentContentInput = styled.textarea`
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  background-color: #f5f7fa;
  outline: none;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #333;
  margin: 0px 10px;

  // 자동 확장 설정
  resize: none; /* 사용자가 크기 변경 불가 (필요 시 제거 가능) */
  height: auto; /* 기본 높이 */
  max-height: 300px; /* 최대 높이 설정 */
`;

const CommentSubmitButton = styled.button`
  font-size: 16px;
  font-family: "Pretendard-Bold";
  color: #00656D;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #00656D;
  padding: 5px 10px 5px 10px;
  margin-left: 5px;

  &:hover {
    color: #ffffff;
    background-color: #00656D;
  }
`;

const DetailPostPage = () => {
  const { postId } = useParams();
  const [postDetail, setPostDetail] = useState(null);
  const [commentList, setCommentList] = useState([]);

  // 댓글 입력값 상태 관리
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await apiClient.get(`/api/posts/${postId}`);

        if (response.status === 200) {
          const { code, data } = response.data;

          if (code === "0000") {
            setPostDetail(data);
          }
        }
      } catch (error) {
        console.error("게시글 상세 조회 중 오류 발생", error);
      }
    };

    fetchPostDetail();
  }, [postId]);

  useEffect(() => {
    const fetchCommentList = async () => {
      try {
        const response = await apiClient.get(`/api/comments/${postId}`);

        if (response.status === 200) {
          const { code, data } = response.data;

          if (code === "0000") {
            setCommentList(data);
          }
        }

      } catch (error) {
        console.error("댓글 리스트 조회 중 오류 발생", error);
      }
    };

    fetchCommentList();
  }, []);

  if (!postDetail) {
    return <div>Loading...</div>
  }

  // 댓글 작성 요청
  const handleSubmitComment = async () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const memberId = localStorage.getItem('memberId');
      const response = await apiClient.post(`/api/comments/write/${postId}/${memberId}`, {
        content: commentContent, /* body에 해당 */
      });

      if (response.status === 200) {
        const { code, data } = response.data;

        if (code === '0000') {
          alert("댓글이 등록되었습니다.");

          // 댓글 리스트에 새로 등록된 댓글 추가 (사용자 경험 최적화 if 동기화가 중요 -> 댓글 리스트 api 다시 호출)
          setCommentList((prevList) => [data, ...prevList]);

          // 입력창 초기화
          setCommentContent("");
        }
      }
    } catch (error) {
      console.error("댓글 등록 중 오류 발생", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm");
  };

  return(
    <MainContainer>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostDate>{formatDate(postDetail.createdAt)}</PostDate>

      <UserInfoContainer>
        <UserProfile src={example_profile} />
        <UserNickname>dodo</UserNickname>
        <UserExtraInfo>20대 · 여성 · 봄</UserExtraInfo>
      </UserInfoContainer>

      <PostMainContainer>
        <PostContentContainer>
          <PostContent>{postDetail.content}</PostContent>
        </PostContentContainer>
        <PerfumeInfoContainer></PerfumeInfoContainer>
      </PostMainContainer>

      <PostExtraInfoContainer>
        <PostExtraInfoIcon src={ic_unlike} alt="Like" />
        <PostExtraInfoText>{postDetail.likeCount}</PostExtraInfoText>
        <PostExtraInfoIcon src={ic_comment} alt="Comment" />
        <PostExtraInfoText>{postDetail.commentCount}</PostExtraInfoText>
      </PostExtraInfoContainer>

      <Divider />
      <CommentGuide>댓글</CommentGuide>

      <CommentListContainer>
        {commentList.map((comment, index) => (
          <CommentContainer>
          <CommentUserImage src={comment.imageUrl} />
          <CommentUserAndDate>
            <CommentUserNickName>{comment.nickname}</CommentUserNickName>
            <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
          </CommentUserAndDate>
          <CommentContent>{comment.content}</CommentContent>
          <ReplyButton>답글</ReplyButton>
          <SettingComment src={ic_3dot} />
        </CommentContainer>
        ))}

        <CommentWriterContainer>
          <CommentUserImage src={example_profile} />
          <CommentContentInput
            placeholder="Let’s search what going on your mind..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            />
          <CommentSubmitButton onClick={handleSubmitComment}>등록</CommentSubmitButton>
        </CommentWriterContainer>
      </CommentListContainer>
    </MainContainer>
  )
};

export default DetailPostPage;