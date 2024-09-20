import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

import perfume1 from "../../assets/images/perfume1.jpg";
import perfume2 from "../../assets/images/perfume2.jpg";
import perfume_nonfill from "../../assets/images/ic_perfume_nonfill.png";
import perfume_fill from "../../assets/images/ic_perfume_fill.png";
import ic_calendar from "../../assets/images/ic_calendar.png";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-left: 50px;
  background-color: #FFECE3;
  padding: 20px;
  border-radius: 40px;
  z-index: 999;
  width: 600px;
  height: 400px;
  box-sizing: border-box;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 18px;
  font-family: "Pretendard-SemiBold";
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 20px;
`;

const DateContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const SmallIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const ProfileText = styled.div`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-direction: column;
  width: 100%;
`;

const TitleContent = styled.div`
  font-size: 18px;
  font-family: "Pretendard-SemiBold";
  margin: 10px 0;
`;

const Underline = styled.div`
  height: 1px;
  width: 100%;
  background-color: black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 50px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 50px;
  flex: 1;
`;

const ContentTitle = styled.div`
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const Pink = styled.div`
  color: #F28482;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const BuddyNameContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const BuddyRole = styled.div`
  display: flex;
  font-size: 16px;
  color: #000000;
  font-family: "pretendard-semiBold";
  width: 120px;
`;

const BuddyName = styled.div`
  display: flex;
  font-size: 16px;
  font-family: "Pretendard-regular";
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Stars = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: color 0.3s;
  margin-right: 5px;
`;

const Button = styled.button`
  background-color: white;
  border: 3px solid #F28482;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  width: 120px;
  height: 40px;
  font-weight: bold;
  margin-top: 30px;

  &:hover {
  background-color: #F28482;
  border-color: #ffffff;
  color: #ffffff;
  }
`;

const RatingModal = ({ onClose }) => {

  const [smell, setRating] = useState(0);

  const handleCancelStar = () => {
    alert("향수 평가하기를 취소하셨습니다.")
  };

  const rateStar = (star) => {
    // 별점을 다시 클릭하면 해당 별점만 제거
    if (star === smell) {
      setRating(star - 1); // 현재 선택한 별점 하나만 제거
    } else {
      setRating(star); // 별점 설정
    }
  };

  const getStarImage = (star) => {
    return star <= smell ? perfume_fill : perfume_nonfill;
  };

  return (
    <ModalWrapper>
      <CloseButton onClick={handleCancelStar}>X</CloseButton>
      <Content>
        <DateContainer>
          <SmallIcon src={ic_calendar} alt="calendar" />
          <ProfileText>
            2024-08-31
          </ProfileText>
        </DateContainer>
        <TitleContainer>
          <TitleContent>나만의 향수 평가하기</TitleContent>
          <Underline />
        </TitleContainer>
        <Container>
          <LeftContainer>
            <ProfileImage src={perfume2} alt="Profile" />
          </LeftContainer>
          <RightContent>
            <ContentTitle>
              방금 제작한&nbsp;
              <Pink>향수</Pink>를 평가해주세요!!
            </ContentTitle>
            <ContentContainer>
              <BuddyNameContainer>
                <BuddyRole>향수 이름</BuddyRole>
                <BuddyName>Happy Birthday!</BuddyName>
              </BuddyNameContainer>
              <BuddyNameContainer>
                <BuddyRole>별점</BuddyRole>
                <BuddyName>{`${smell}/5`}</BuddyName>
              </BuddyNameContainer>
            </ContentContainer>
            <RatingContainer>
              <Stars>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Img
                    key={star}
                    className="star"
                    src={getStarImage(star)}
                    alt="Star"
                    onClick={() => rateStar(star)}
                  />
                ))}
              </Stars>
              <Button className="save-button" onClick={onClose}>
                평가 완료
              </Button>
            </RatingContainer>
          </RightContent>
        </Container>
      </Content>
    </ModalWrapper>
  );
};

export default RatingModal;