import React from "react";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScentImageGrid from '../Auth/ScentImageGrid';
import { getScentKrName, images, labelToEnglishMap } from "../Auth/scentData";

import { ExtraInfoContext } from "../../contexts/ExtraInfoContext";
import apiClient from "../Auth/TokenReissue";
import { se } from "date-fns/locale";


const MainContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 60px;
`;

const HighlightTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  color: #00656D;
  text-align: center;
  margin-bottom: 5px;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const Description = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: #000000;
  text-align: center;
`;

const NextButton = styled.button`
  width: 500px;
  height: 50px;
  margin-top: 100px;
  margin-bottom: 80px;
  margin-left: 50px;
  background-color: #ffffff;
  border-radius: 8px;
  border: 2px solid #00656D;
  font-size: 20px;
  color: #00656D;
  white-space: nowrap;
  font-weight: regular;
  box-sizing: border-box;

  &:hover {
  background-color: #00656D;
  color: #FFFFFF;
  }
`;

const ChangelikeScentPage = () => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // 페이지 로딩 시 기존 정보 가져오기
  useEffect(() => {
    const fetchScentData = async () => {
      try {
        const response = await apiClient.get(`/api/mypage/${memberId}`);
        const { likedScents } = response.data.data;
        console.log(`사용자의 원래 좋아하는 향: ${likedScents}`);

        setSelectedImages(likedScents);
        setLoading(false);
      } catch (error) {
        console.error("사용자 데이터 불러오기 실패: ", error);
        alert("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchScentData();
  }, [memberId]);

  console.log("selectedImages: ", selectedImages);

  const handleImageClick = (label) => {
    if (selectedImages.includes(label)) {
      setSelectedImages(selectedImages.filter((item) => item !== label));
      console.log("향 선택 취소");
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, label]);
      console.log("향 선택 추가");
    }
  };

  const handleNextClick = () => {
    navigate('/changeunlikeScent', {
      state: { likedScents: selectedImages }
    });
  };

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 UI
  }

  return (
    <MainContainer>
      <HighlightTitle>좋아하는<br/></HighlightTitle>
      <Title>향을 선택해주세요!</Title>
      <Description>5개를 선택해주세요.</Description>
      <ScentImageGrid
        images={images}
        selectedImages={selectedImages}
        onImageClick={handleImageClick}
      />
      <NextButton onClick={handleNextClick}>다음으로 이동하기</NextButton>
    </MainContainer>
  );
};

export default ChangelikeScentPage;