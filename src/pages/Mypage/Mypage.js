import React from "react";
import { useState } from "react";
import styled from "styled-components";
import MyInfoTab from './MyInfoTab';
import CommunityTab from "./CommunityTab";
import ProfileImageModal from "./ProfileImageModal";

import example_profile from '../../assets/images/example_profile.jpg';
import PerfumeTab from "./PerfumeTab";

const Page = styled.div`
  background-color: #FAF8F1;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
`;

const SideBarContainer = styled.div`
  width: 400px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
`;

const MyProfileContainer = styled.div`
  width: 350px;
  height: 220px;
  background-color: #ffffff;
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 30px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 0px;
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleBorder = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) =>
    `conic-gradient(#00656D ${props.percentage}%, #DADEE6 ${props.percentage}% 100%)`}; 
`;

const NumberBadge = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 25px;
  height: 25px;
  background-color: #00656D;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 10px;
  font-family: "Pretendard-Bold";
`;

const CircleImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 3px solid #fff;

  &:hover {
    border-color: #ffffff;
  }
`;

const MyInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const MyNickName = styled.p`
  font-size: 20px;
  font-family: "Pretendard-Regular";
  margin: 0px 0px 4px 0px;
`;

const MyEmail = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
  margin: 0px;
`;

const MyPerfumeCount = styled.p`
    font-size: 12px;
    font-family: "Pretendard-Regular";
    color: #666666;
    margin: 7px 0px 0px 0px;
    cursor: pointer;
`;

const ProfileButtonContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ChangeButton = styled.div`
  width: 100px;
  border: 2px solid #00656D;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #00656D;
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  padding: 10px 25px 10px 25px;

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const TabContainer = styled.div`
  width: 800px;
  height: 90%;
  background-color: #ffffff;
  border-radius: 8px;
  padding-top: 40px;
  padding-right: 70px;
  padding-left: 70px;
  margin-right: 70px;
  justify-content: flex-start;
  align-items: center;
  opacity: 80%;
  position: relative;
`;

const TabButtonContainer = styled.div`
  position: absolute;
  top: 170px;
  right: 20px;
  display: flex;
  flex-direction: column;
`;

const TabButton = styled.button`
  width: 120px;
  height: 50px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.active ? "#00656D" : "#FFFFFF")};
  color: ${(props) => (props.active ? "#FFFFFF" : "#00656D")};
  border: 3px solid #00656D;
  border-radius: 0px;
  font-size: 16px;
  font-family: "Pretendard-Bold";
  cursor: pointer;
  z-index: 1; /* 버튼이 위에 보임 */

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("MyInfo");
  const [isModalOpen, setModalOpen] = useState(false);

  const nickname = "dodo";
  const email = "dodo@naver.com";
  const perfumeCount = "17";
  
  const badgeNumber = 15; // 서버 값으로 교체 필요
  const progressPercentage = (badgeNumber / 50) * 100;

  // 모달 열기
  const openModal = () => setModalOpen(true);

  // 모달 닫기
  const closeModal = () => setModalOpen(false);

  // 탭 전환
  const renderTabContent = () => {
    switch (activeTab) {
      case "MyInfo":
        return <MyInfoTab />;
      case "Community":
        return <CommunityTab />
      case "Perfume" :
        return <PerfumeTab />
      default:
        return <MyInfoTab />;
    }

  }
  return(
    <Page>
      <SideBarContainer>
        <MyProfileContainer>
          <ProfileContainer>
            <CircleWrapper>
              <CircleBorder percentage={progressPercentage}>
                <CircleImage src={example_profile}></CircleImage>
              </CircleBorder>
              <NumberBadge>{badgeNumber}</NumberBadge>
            </CircleWrapper>
            <MyInfoContainer>
              <MyNickName>{nickname}님</MyNickName>
              <MyEmail>{email}</MyEmail>
              <MyPerfumeCount>{nickname}님의 향수 {perfumeCount}개</MyPerfumeCount>
            </MyInfoContainer>
          </ProfileContainer>
          <ProfileButtonContainer>
            <ChangeButton onClick={openModal}>프로필 사진 변경</ChangeButton>
            <ChangeButton>로그아웃</ChangeButton>
          </ProfileButtonContainer>
        </MyProfileContainer>
      </SideBarContainer>
      <TabContainer>
        {/* 탭에 따른 내용 표시 */}
        {renderTabContent()}
      </TabContainer>

      <TabButtonContainer>
        <TabButton active={activeTab === "MyInfo"} onClick={() => setActiveTab("MyInfo")}>My Info</TabButton>
        <TabButton active={activeTab === "Community"} onClick={() => setActiveTab("Community")}>Community</TabButton>
        <TabButton active={activeTab === "Perfume"} onClick={() => setActiveTab("Perfume")}>Perfume</TabButton>
      </TabButtonContainer>

      {/* 모달이 열렸을 때만 표시 */}
      {isModalOpen && <ProfileImageModal onClose={closeModal} />}
    </Page>
  )
}

export default Mypage;