import React from "react";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ScentImageGrid from '../Auth/ScentImageGrid';
import { images, labelToEnglishMap } from "../Auth/scentData";

import { ExtraInfoContext } from "../../contexts/ExtraInfoContext";


const MainContainer = styled.div`
  width: 80%;
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
  const location = useLocation();

  // 전달받은 originLikedScents와 originDislikedScents
  const { originLikedScents = [], originDislikedScents = [] } = location.state || {};

  const [selectedImages, setSelectedImages] = useState(
    originLikedScents.map(scent => scent.english)
  );

  console.log("선택된 값 출력: ", originLikedScents);
  console.log("초기화된 selectedImages: ", selectedImages);

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지가 로드될 때 스크롤을 맨 위로 이동
  }, []);

  const handleNextClick = () => {
    if (selectedImages.length !== 5) {
      alert("5개를 선택해주세요.");
      return; // 5개가 아닌 경우 함수 실행을 멈추고 경고 메시지를 표시합니다.
    }

    const englishNames = selectedImages.map(label => labelToEnglishMap[label]);
    console.log("변환된 영어 이름: ", englishNames);
    localStorage.setItem('likedScents', JSON.stringify(englishNames));
    navigate('/changeunlikeScent', {
      state: {
        originDislikedScents
      }
    });
  };

  const handleImageClick = (label) => {
    if (selectedImages.includes(label)) {
      setSelectedImages(selectedImages.filter((item) => item !== label));
    } else if (selectedImages.length < 5) {
      setSelectedImages([...selectedImages, label]);
    }
  };

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