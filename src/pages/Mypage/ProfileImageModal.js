import React, { useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import ic_close from '../../assets/images/ic_close.png'
import default_profile_image from '../../assets/images/default_profile_image.png';
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 350px;
  height: 350px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid #000;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileChangeTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ProfileChangeTitle = styled.p`
  font-size: 20px;
  font-family: "Pretendard-Regular";
  text-align: center;
  flex: 1;
`;

const CloseIcon = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const CircleImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: none;
  margin-top: 10px;
`;

const ProfileImageChangeGuide = styled.p`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  margin: 30px 0px 0px 0px;
`;

const ChooseImageButton = styled.button`
  width: 120px;
  background-color: #D9D9D9;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  text-align: center;
  padding: 5px 0px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;

  &:hover {
    font-weight: Bold;
  }
`;

const ProfileImageChangeDone = styled.button`
  width: 120px;
  background-color: #00656D;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  color: #ffffff;
  text-align: center;
  padding: 10px 20px;
  margin-top: 30px;
  border: none;
  border-radius: 8px;

  &:hover {
    font-weight: Bold;
  }
`;

const ProfileImageModal = ({onClose, onUpdate, initialImageUrl }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPerviewUrl] = useState(initialImageUrl || default_profile_image);
  const inputRef = useRef(); // input 요소에 대한 참조

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPerviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("사진 파일을 선택해주세요.");
      return;
    }

    try {
      const memberId = localStorage.getItem('memberId');
      const accessToken = localStorage.getItem('accessToken');

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/s3/profile-image?memberId=${memberId}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.code === '0000') {
        alert("프로필 사진이 성공적으로 변경되었습니다.");
        onUpdate(previewUrl); // Mypage에서 이미지를 업데이트하도록 콜백 호출
        onClose(); // 모달 닫기
      } else {
        alert("프로필 사진 변경에 실패했습니다.");
        console.error("프로필 사진 등록 실패", response.data.message);
      }
    } catch (error) {
      alert("프로필 사진 변경에 오류가 발생했습니다.");
      console.error("프로필 사진 업로드 오류", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer ontainer>
        <ProfileChangeTitleContainer>
          <ProfileChangeTitle>프로필 사진 변경</ProfileChangeTitle>
          <CloseIcon src={ic_close} onClick={onClose}/>
        </ProfileChangeTitleContainer>
        <CircleImage src={previewUrl} alt="Profile Preview"/>
        <ProfileImageChangeGuide>변경할 사진을 선택해주세요.</ProfileImageChangeGuide>
        <ChooseImageButton onClick={() => inputRef.current.click() }>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={inputRef} // input 요소에 대한 참조
            style={{ display: 'none' }}
          />
          사진 선택하기
          </ChooseImageButton>
        <ProfileImageChangeDone onClick={handleUpload}>완료하기</ProfileImageChangeDone>
      </ModalContainer>
  </ModalOverlay>


  )
};

export default ProfileImageModal;