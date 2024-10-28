import { React, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import example_perfumeKnowledge from '../../assets/images/example_perfumeKnowledge.png';
import example_perfumeKnowledge2 from '../../assets/images/example_perfumeKnowledge2.jpg';

import example_profile from '../../assets/images/example_profile.jpg';
import ic_like from '../../assets/images/ic_like.png';
import ic_unlike from '../../assets/images/ic_unlike.png';
import ic_comment from '../../assets/images/ic_comment.png';
import ic_3dot from '../../assets/images/ic_3dot.png';
import MyPostTab from "./MyPostTab";
import MyCommentTab from "./MyCommentTab";


const MainContainer = styled.div`
  widht: 100vw;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50px;
  margin-bottom: 50px;
`;

const PerfumeknowledgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const PerfumeKnowledgeTitle = styled.p`
  font-size: 24px;
  font-family: "Pretendard-Bold";
  margin: 0;
`;

const CarouselContainer = styled.div`
  width: 80vw;
  margin: 30px 0px;
  perspective: 1000px;
`;

const SlideCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 250px;
  background-color: #f0f0f0;
  border-radius: 40px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  transition: transform 0.5s ease-in-out; // 부드러운 크기 변경
  transform-style: preserve-3d;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: #ffffff;
  font-size: 28px;
  font-family: "Pretendard-SemiBold";
`;

const Divider = styled.hr`
  width: 90vw;
  border: none;
  border-top: 1px solid #E6E6E6;
  margin: 20px 10px 20px 10px;
`;

const TitleContainer = styled.div`
  width: 80vw;
  display: flex;
  justfiy-content: flex-start;
  align-items: flex-start;
`;

const SectionTitle = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  text-align: left;
`;

const Top3PostContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justfiy-content: center;
  align-itmes: center;
  margin-bottom: 30px;
  gap: 30px;
`;

const Top3PostCard = styled.div`
  width: 400px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid #E6E6E6;
`;

const PostHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostUserNickname = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  margin: 0px 0px 0px 5px;
`;

const PostImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const HeartIcon = styled.img`
  width: 18px;
  height: 21px;
  cursor: pointer;
  object-fit: contain;
`;

const PostTitle = styled.h3`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  margin: 0;
`;

const PostContent = styled.p`
  font-size: 14px;
  color: #000000;
  line-height: 1.5;
  margin: 10px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const SearchBarContainer = styled.div`
  width: 80vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  margin-bottom: 30px;
`;

const SearchDropDownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  padding: 10px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 80px;
  z-index: 10;
`;

const DropdownListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

// 검색 입력창 스타일
const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  background-color: #f5f7fa;
  outline: none;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #333;
  margin: 0px 20px;
`;

// 검색 버튼 스타일
const SearchButton = styled.button`
  background-color: #00656D;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: "Pretendard-SemiBold";
`;

const PostAndUserContainer = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
`;

const PostListContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyInfoContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justfiy-content: flex-start;
  align-items: flex-start;
  border: 1px solid #EAEAEA;
  border-radius: 5px;
  padding: 20px;
`;

const PostTopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-itmes: center;
`;

const WriterInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const WriterImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;

const WriterInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
`;

const WriterNickname = styled.p`
  font-size: 20px;
  font-family: "Pretendard-Regular";
  margin: 0px;
  `;

const PostHour = styled.p`
  font-size: 14px;
  font-family: "Pretendard-thin";
  margin: 0px;
  color: #808080;
`;

const PostSettingIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  object-fit: contain;
`;

const PostItemTitle = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  margin: 15px 0px 0px 0px;
`;

const PostItemContent = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  text-align: left;
  padding: 0 10 0 0px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 보여줄 줄 수 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostExtraInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justfiy-content: flex-start;
  align-items: center;
`;

const PostExtraInfoIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
  object-fit: contain;
`;

const PostExtraInfoText = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  color: #808080;
  padding: 0px 10px 0px 3px;
`;

const MyInfoProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center
`;

const MyInfoProfileImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
`;

const WritePostButton = styled.button`
  width: 100%;
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  color: #ffffff;
  background-color: #00656D;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 20px;
`;

const TabButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justfiy-content: center;
  align-items: center;
`;

const TabButton = styled.button`
  width: 100%;
  margin: 20px 0px 10px 0px;
  background-color: #ffffff;
  border: none;
  border-bottom: ${(props) => (props.active ? "3px solid #00656D" : "none")};
  font-size: 14px;
  font-family: "Pretendard-Bold";
  color: ${(props) => (props.active) ? "#00656D" : "#000000"};
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #00656D;
    color: #ffffff;
  }
`;

const MyPostListContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
`;

const CommunityPage = () => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("글");
  const [activeTab, setActiveTab] = useState("내 글 목록");
  const title = "면접날 향수 꿀조합 공유합니다! (바닐라 베이스)";
  const content = "면접날 너무 긴장되는 마음을 릴렉스하면서, 또 너무 강렬하지 않고 은은한 향수를 만들어 보았습니다! 바닐라 베이스에 우디한 향을 조금 넣어 은은한 향을 강조해주었어요~! 이거 뿌리고 면접에 착 붙었습니다 ^0^ 도움이 되실까 글을 적어봅니다 꿀조합 👍🏻 면접 합격 향수 만들기 위해서는 ..."

  const posts = [
    {
      id: 1,
      nickname : "도도입니다",
      title: "향수 포스트 1.",
      content: "나는 <그대들 도대체 왜 그러고 사는가>에 등장하는 왜가리 캐릭터의 성우가 스다 마사키일 것이라곤 전혀 생각도 못했다. 스다고 그렇게 쓰는 사람은 처음 봤다. 집에 와서 예고편을 다시 틀어보고 왜가리의 음성이...",
      liked: true,
      Profileimage: "https://example.com/image1.jpg"
    },
    {
      id: 2,
      nickname : "도도입니다",
      title: "향수 포스트 2",
      content: "“그대를 언제까지 그리고 살 건가”...",
      liked: false,
      Profileimage: "https://example.com/image2.jpg"
    },
    {
      id: 3,
      nickname : "도도입니다",
      title: "향수 포스트 3",
      content: "“그대를 언제까지 그리고 살 건가”...",
      liked: false,
      Profileimage: "https://example.com/image3.jpg"
    }
  ];

  // 캐로셀 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한번에 한 장만 보여줌
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0", // 패딩을 0으로 설정해 중앙 카드만 강조
    variableWidth: true,
    beforeChange: (current, next) => handleScale(next),
    afterChange: (current) => handleScale(current),
  };

  const handle3DEffect = (currentIndex) => {
    const cards = document.querySelectorAll('.slick-active');
    cards.forEach((card, index) => {
      if (index === currentIndex) {
        card.style.transform = "scale(1.2) translateZ(100px) rotateY(0deg)"; // 중앙 카드는 크게
        card.style.zIndex = "10" // 중앙 카드는 젤 앞
      } else if (index < currentIndex) {
        card.style.transform = "scale(0.8) translateX(-100px) rotateY(20deg)"; // 왼쪽 카드는 작게, 살짝 돌림
        card.style.zIndex = "5";
      } else {
        card.style.transform = "scale(0.8) translateX(-100px) rotateY(-20deg)"; // 왼쪽 카드는 작게, 살짝 돌림
        card.style.zIndex = "5";
      }
    })
  }

  // 메인 카드와 나머지 카드들의 크기 변화를 위한 함수
  const handleScale = (currentIndex) => {
    const cards = document.querySelectorAll('.slick-slide');
    cards.forEach((card, index) => {
        if (index === currentIndex) {
            card.style.transform = "scale(1.2)"; // 가운데 카드 확대
            card.style.zIndex = "1"; // 가운데 카드 앞으로
        } else {
            card.style.transform = "scale(0.8)"; // 나머지 카드는 축소
            card.style.zIndex = "0"; // 뒤로
        }
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // 탭 전환
  const renderTabContent = () => {
    switch (activeTab) {
      case "MyPost":
        return <MyPostTab />;
      case "MyComment":
        return <MyCommentTab />
      default:
        return <MyPostTab />;
    }
  };

  const handleWritePostClick = () => {
    navigate('/writePost');
  };

  return (
    <MainContainer>
      <PerfumeknowledgeContainer>
        <PerfumeKnowledgeTitle>오늘의 향수 지식</PerfumeKnowledgeTitle>
      </PerfumeknowledgeContainer>
      <CarouselContainer>
        <Slider {...settings}>
          <SlideCard>
            <CardImage src={example_perfumeKnowledge} alt="향수 지식 이미지 1"/>
            <CardText>향수의 지속력을 높이는 방법은?</CardText>
          </SlideCard>
          <SlideCard>
            <CardImage src={example_perfumeKnowledge2} alt="향수 지식 이미지 2"/>
            <CardText>여름에 어울리는 시원한 향기?</CardText>
          </SlideCard>
          <SlideCard>
            <CardImage src={example_perfumeKnowledge} alt="향수 지식 이미지 3"/>
            <CardText>가을에 어울리는 따뜻한 향수에 대해서</CardText>
          </SlideCard>
          <SlideCard>
            <CardImage src={example_perfumeKnowledge2} alt="향수 지식 이미지 4"/>
            <CardText>봄에는 과연 꽃향기가 어울릴까?</CardText>
          </SlideCard>
        </Slider>
      </CarouselContainer>
      
      <Divider/>

      <TitleContainer>
        <SectionTitle>현재 인기있는 포스트</SectionTitle>
      </TitleContainer>
      <Top3PostContainer>
        {posts.map(post => (
          <Top3PostCard>
          <PostHeader>
            <UserInfo>
              <PostImage src={example_profile} alt="Use Profile" />
              <PostUserNickname>{post.nickname}</PostUserNickname>
            </UserInfo>
            <HeartIcon src={ic_like} />
          </PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
        </Top3PostCard>
        ))}
      </Top3PostContainer>

      <SearchBarContainer>
        <SearchDropDownContainer>
          <DropdownButton onClick={toggleDropdown}>
            {selectedOption} ▼
          </DropdownButton>
          {isOpen && (
          <DropdownList>
            <DropdownListItem onClick={() => selectOption("글")}>
              글
            </DropdownListItem>
            <DropdownListItem onClick={() => selectOption("댓글")}>
              댓글
            </DropdownListItem>
            <DropdownListItem onClick={() => selectOption("작성자")}>
              작성자
            </DropdownListItem>
          </DropdownList>
        )}
        </SearchDropDownContainer>
        <SearchInput placeholder="Let's search what's on your mind..."/>
        <SearchButton>SEARCH</SearchButton>
      </SearchBarContainer>

      <TitleContainer>
        <SectionTitle>Scentasy의 새 글</SectionTitle>
      </TitleContainer>
      <PostAndUserContainer>
        <PostListContainer>
          <PostItemContainer>
            <PostTopContainer>
              <WriterInfoContainer>
                <WriterImage src={example_profile}/>
                <WriterInfoContent>
                  <WriterNickname>dodo</WriterNickname>
                  <PostHour>2024-10-05</PostHour>
                </WriterInfoContent>
              </WriterInfoContainer>
              <PostSettingIcon src={ic_3dot}/>
            </PostTopContainer>
            <PostItemTitle>{title}</PostItemTitle>
            <PostItemContent>{content}</PostItemContent>
            <PostExtraInfoContainer>
              <PostExtraInfoIcon src={ic_unlike}/>
              <PostExtraInfoText>20</PostExtraInfoText>
              <PostExtraInfoIcon src={ic_comment}/>
              <PostExtraInfoText>155</PostExtraInfoText>
          </PostExtraInfoContainer>
          </PostItemContainer>
        </PostListContainer>

        <MyInfoContainer>
          <MyInfoProfileContainer>
            <MyInfoProfileImage src={example_profile}/>
            <WriterInfoContent>
              <WriterNickname>dodo</WriterNickname>
              <PostHour>dodo@naver.com</PostHour>
            </WriterInfoContent>
          </MyInfoProfileContainer>
          <WritePostButton onClick={handleWritePostClick}>글 작성하기</WritePostButton>
          <TabButtonContainer>
            <TabButton active={activeTab === "MyPost"} onClick={() => setActiveTab("MyPost")}>내 글 목록</TabButton>
            <TabButton active={activeTab === "MyComment"} onClick={() => setActiveTab("MyComment")}>내 댓글 목록</TabButton>
          </TabButtonContainer>
          <MyPostListContent>{renderTabContent()}</MyPostListContent>
        </MyInfoContainer>
      </PostAndUserContainer>
    </MainContainer>
  )
};

export default CommunityPage;