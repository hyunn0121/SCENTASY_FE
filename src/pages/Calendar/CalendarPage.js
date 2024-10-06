import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import PerfumeDetailModal from '../Perfume/PerfumeDetailModal';

import { ko } from 'date-fns/locale'; 

import backgroundImage2 from '../../assets/images/img_onboarding2.png';
import example_profile from '../../assets/images/example_profile.jpg';
import default_profile_img from '../../assets/images/default_profile_image.png';
import arc_text from '../../assets/images/calendar_arc_text.png';
import ic_memo_submit from '../../assets/images/ic_memo_submit.png';
import left_arrow from '../../assets/images/ic_calendar_left_arrow.png';
import right_arrow from '../../assets/images/ic_calendar_right_arrow.png';

const Page = styled.div`
  background-color: #FAF8F1;
  background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; /* 배경 고정으로 parallax 효과 */
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 1000px;
  height: 650px;
  background-color: #ffffff;
  border-radius: 50px;
  padding-top: 40px;
  padding-right: 70px;
  padding-left: 70px;
  justify-content: space-between;
  align-items: center;
  opacity: 80%;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleBorder = styled.div`
  width: 100px;
  height: 100px;
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
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 3px solid #fff;

  &:hover {
    border-color: #ffffff;
  }
`;

const ProfileTextContainer = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 30px;
`;

const ProfileTitle = styled.h1`
  font-size: 28px;
  font-family: "Montserrat-Bold";
  margin-bottom: 5px;
`;

const MyPerfumeCount = styled.p`
    font-size: 12px;
    font-family: "Pretendard-Regular";
    color: #666666;
    margin: 0px;
    cursor: pointer;
`;

const MainContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 70px;
`;

const CalendarGuide = styled.h1`
  font-size: 14px;
  font-family: "Pretendard-ExtraLight";
  text-align: center;
  color: #666666;
  margin-bottom: 40px;
`;

const CalendarWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  font-family: "Pretendard-Bold";
`;

const Day = styled.div`
  text-align: center;
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  color: #000000;
`;

const DateTile = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${props => 
    props.isSelected ? '#00656D' :
    props.hasPerfume ? '#E3F5F5' : 'transparent'};
  color: ${props => (props.isSelected ? '#ffffff' : ' #00656D;')};

  &:hover {
    background-color: #E3F5F5;
  }
`;

const CalendarTitle = styled.div`
  font-size: 24px;
  font-family: "Montserrat-Bold";
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarArrowIcon = styled.img`
  width: 12px;
  height: 18px;
  cursor: pointer;
  margin: 0px 35px;
`;

const CardContainer = styled.div`
  perspective: 1000px;
  widht: 340px;
  height: 450px;
  border: 2px solid #E7E7E7;
  border-radius: 30px;
  display: flex'
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-right: 70px;
`;

// 카드 플립 효과
const FlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: ${({ isFlipped }) => (isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardFront = styled.div`
  width: 340px;
  height: 450px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  position: relative; /* 자식 요소의 절대 위치 지정 가능하게 만듦 */
  transform: rotateY(0deg);
`;

const CardBack = styled.div`
  width: 340px;
  height: 450px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  position: absolute;  /* 카드가 쌓이도록 절대 위치 */
  top: 0;
  left: 0;
  transform: rotateY(180deg);  /* 뒷면은 기본적으로 180도 회전 */
`;

const TopDivider = styled.hr`
  width: calc(100% - 80px);
  border: none;
  border-top: 1px solid #000000;
  margin: 30px 0px;
`;

const BottomDivider = styled.hr`
  width: calc(100% - 80px);
  border: none;
  border-top: 1px solid #000000;
  margin-top: 20px;
`;

const ArcText = styled.img`
  width: 320px;
  height: 160px;
  object-fit: cover;
  position: absolute; /* ArcText를 절대 위치로 설정 */
  margin-top: 80px;
  z-index: 1; /* ArcText가 가장 위에 오도록 설정 */
`;

const PerfumeCardScentasyLine1 = styled.p`
  font-size: 50px;
  font-family: "NanumMyeongjo-ExtraBold";
  margin: 0;
  margin-bottom: 10px;
  padding-right: 50px;
  text-align: center;
  position: relative;
  z-index: 2;
  margin-top: 120px;
`;

const PerfumeCardScentasyLine2 = styled.p`
  font-size: 50px;
  font-family: "NanumMyeongjo-ExtraBold";
  margin: 0;
  text-align: center;
  padding-left: 50px; /* TASY를 오른쪽으로 밀기 위한 패딩 */
`;

const TheScentText = styled.p`
  font-size: 20px;
  font-family: "NanumMyeongjo";
  margin-top: 80px;
  margin-bottom: 0px;
  text-align: center;
`;

const PerfumeListTitle = styled.p`
  font-size: 24px;
  font-family: "NanumMyeongjo-Bold";
  margin-top: 30px;
  margin-bottom: 0px;
  text-align: center;
`;

const PerfumeListGuide = styled.p`
  font-size: 14px;
  font-family: "Montserrat-Regular";
  color: #666666;
  text-align: left;
  margin: 10px 0px;
`;

const PerfumeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 40px;
  margin-right: 40px;
  padding: 10px 0px;
  border-bottom: 1px slid #E7E7E7;
  font-family: "Pretendard-Regular";
  font-size: 14px;

  /* 클릭된 상태에 따라 스타일 다르게 적용 */
  background-color: ${(props) => (props.isSelected ? '#E3F5F5' : 'transparent')};
  border-radius: ${(props) => (props.isSelected ? '10px' : '0')};
  font-weight: ${(props) => (props.isSelected ? '700' : 'normal')};
  color: ${(props) => (props.isSelected ? '#000000' : '#181818')};

  &:hover {
    background-color: #E3F5F5;
    border-radius: 10px;
    padding: 10px;
    font-weight: 700;
    color: #000000
  }
`;

const NoPerfumeItem = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
`;

const ListDivider = styled.hr`
  width: calc(100% - 80px);
  border: none;
  border-top: 1px solid #E7E7E7;
  margin: 2px auto;
`;

const MemoCount = styled.p`
  color: #181818;
  font-size: 14px;
  margin: 0;
`;

const PerfumeListContainer = styled.div`
  width: 100%;
  padding: 10px 0;
`;

const PerfumeMemoContainer = styled.div`
  position: relative; /* 메모 저장 버튼을 텍스트 영역 내에서 절대 위치시킬 수 있도록 */
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 10px;

  textarea {
    &:focus {
      outline: none; /* 텍스트 에리어에 포커스가 있을 때 아웃라인 제거 */
  }
`;

const PerfumeMemoInput = styled.textarea`
  width: 250px;
  height: 80px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #E7E7E7;
  resize: none;
  font-family: "Montserrat-Regular";
  font-size: 14px;
  color: #000000;
`;

const MemoSubmitButton = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  position: absolute;
  right: 10px;
  bottom: 10px;
  cursor: pointer;
`;

const PerfumeDetailButton = styled.button`
  background-color: #00656D;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-family: "Montserrat-Bold";
  color: #ffffff;
  padding: 8px 40px;
  margin-top: 20px;
  text-align: center;
`;

const CalendarPage = () => {

  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear()); // 초기 연도
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());  // 초기 월 (0부터 시작, 7은 8월)
  const [selectedDate, setSelectedDate] = useState(null); // 선택된 날짜 상태 추가
  const [perfumeDates, setPerfumeDates] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const [userProfile, setUserProfile] = useState(default_profile_img); // User 프로필 이미지
  const [perfumeCount, setPerfumeCount] = useState(0); // 전체 향수 개수
  const [perfumeList, setPerfumeList] = useState([]); // 향수 목록
  const [selectedPerfumes, setSelectedPerfumes] = useState([]);
  const [selectedPerfumeId, setSelectedPerfumeId] = useState(null);

  const [memoContent, setMemoContent] = useState("");

  const handlePerfumeClick = (event, perfume) => {
    event.stopPropagation();
    setSelectedPerfumeId(perfume.id);
  };
  
  const progressPercentage = (perfumeCount / 50) * 100;

  // 전체 향수 목록 조회 디버깅용
  useEffect(() => {
    console.log('Perfume List:', perfumeList); // 로그로 perfumeList 데이터 확인
    console.log('Selected Perfumes:', selectedPerfumes); // 로그로 selectedPerfumes 데이터 확인
  }, [perfumeList, selectedPerfumes]);

  // 사용자 프로필 이미지
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');

        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다.');
          // 토큰이 없을 경우 로그인 페이지로 리다이렉트하거나 다시 로그인 유도
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/mypage/{memberId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const data = await response.json();
        if (data.code === '0000') {
          setUserProfile(data.imageUrl || default_profile_img);
        }
      } catch (error) {

      }
    };

    fetchUserProfile();
  }, []);

  // 전체 향수 개수 조회
  useEffect(() => {
    const fetchPerfumeCount = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');
  
        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다.');
          // 토큰이 없을 경우 로그인 페이지로 리다이렉트하거나 다시 로그인 유도
          return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/perfume/count`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        const data = await response.json();
        if (data.code === '0000') {
          setPerfumeCount(data.data);
        }
    } catch (error) {
      console.error("전체 향수 목록 오류:", error);
      }
    };
    
    fetchPerfumeCount();
  }, []);

  // 전체 향수 목록 조회
  useEffect(() => {
    const fetchPerfumeData = async () => {
      try {
        const memberId = localStorage.getItem('memberId');
        const accessToken = localStorage.getItem('accessToken');
  
        if (!memberId || !accessToken) {
          console.error('로그인이 필요합니다.');
          // 토큰이 없을 경우 로그인 페이지로 리다이렉트하거나 다시 로그인 유도
          return;
        }
  
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/perfume`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            console.error('인증 오류: 액세스 토큰이 만료되었거나 유효하지 않습니다.');
            // 만료된 토큰 처리: 재로그인 로직 추가 가능
          }
          throw new Error(`Error: ${response.status}`);
        }
  
      const data = await response.json();
      if (data.code === '0000') {
        // 안전하게 memos 배열에 접근
        const perfumeDataWithMemoCount = data.data.map(perfume => ({
          ...perfume,
          memoCount: perfume.memos ? perfume.memos.length : 0, // memos가 undefined일 때 0으로 처리
        }));

        const perfumeDates = data.data.map((perfume) => new Date(perfume.createdAt));
        setPerfumeDates(perfumeDates);  // 날짜 목록 저장
        setPerfumeList(perfumeDataWithMemoCount);
      } else {
        console.error("Failed to fetch perfume data");
      }
      } catch (error) {
        console.error("전체 향수 목록 오류:", error);
      }
    };
  
    fetchPerfumeData();
  }, []);

  // 메모 작성
  const handleMemoSubmit = async () => {
    if (!memoContent || !selectedPerfumeId) {
      alert('향수를 선택한 뒤 메모 내용을 입력하세요.');
      return;
    }

    try {
      const memberId = localStorage.getItem('memberId');
      const accessToken = localStorage.getItem('accessToken');

      console.log(`Submitting memo for perfume ID: ${selectedPerfumeId}`);

      const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/memo/write/${memberId}/${selectedPerfumeId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: memoContent }),
      });

      if (response.ok) {
        alert('메모가 성공적으로 저장되었습니다.');
        setMemoContent(''); // 메모 제출 후 입력 필드 초기화
      } else {
        throw new Error('메모 저장에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('메모 제출 중 오류 발생: ', error);
      alert('메모 저장 중 오류가 발생했습니다.');
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getStartDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay(); // Returns 0 for Sunday
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };


  const handleDateClick = (day) => {
    setSelectedDate(day);

    // 새로운 날짜 선택 -> 선택 향수 초기화
    setSelectedPerfumeId(null);

    const selectedPerfumesForDate = perfumeList.filter(perfume => {
      const perfumeDate = new Date(perfume.createdAt);
      return isSameDate(perfumeDate, new Date(currentYear, currentMonth, day))
    });

    setSelectedPerfumes(selectedPerfumesForDate);
  };

  useEffect(() => {
    if (selectedDate) {
      setIsFlipped(false); // 앞면으로 먼저 돌림
      const flipTimeout = setTimeout(() => {
        setIsFlipped(true);
      }, 300);

      return () => clearTimeout(flipTimeout);
    }
  }, [selectedDate]);

  const CalendarComponent = ({ year, month }) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDayOfMonth(year, month);

    const hasPerfumeOnDate = (date) => {
      return perfumeDates.some(perfumeDate => {
        return perfumeDate.getFullYear() === year && perfumeDate.getMonth() === month && perfumeDate.getDate() === date;
      });
    };

    const isToday = (day) => {
      return year === today.getFullYear() && month === today.getMonth() && day === today.getDate();
    }

    // Creating empty slots for days before the first day of the month
    const emptyDays = Array(startDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return (
      <CalendarWrapper>
        {daysOfWeek.map(day => (
          <Day key={day}>{day}</Day>
        ))}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {days.map(day => (
          <DateTile
            key={day}
            isSelected={selectedDate === day} // 선택된 날짜 스타일
            isToday={isToday(day)} // 오늘 날짜인지 확인
            hasPerfume={hasPerfumeOnDate(day)} // 향수있는 날짜
            onClick={() => handleDateClick(day)}
          >
            {day}
          </DateTile>
        ))}
      </CalendarWrapper>
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 향수 클릭 -> 선택 & 이벤트 전파 x => stopPropagation() 사용
    const handleClick = (event, perfume) => {
      event.stopPropagation();

      // perfume 존재 x -> 작업 x
      if (!perfume) return;

      // 이미 선택한 항목 다시 클릭 -> 선택 해제
      if (selectedPerfumeId === perfume.perfumeId) {
        setSelectedPerfumeId(null);
      } else {
        setSelectedPerfumeId(perfume.perfumeId);
        console.log(`선택된 향수: ${perfume.perfumeId}`);
      }
  };

  const handleButtonClick = (event) => {
    event.stopPropagation(); // 이벤트 전파를 막아 카드가 뒤집히지 않게 합니다.
    handleOpenModal(); // 모달을 엽니다.
  };

  return (
    <Page backgroundImage={backgroundImage2}>
      <ContentContainer>
        <ProfileContainer>
          <CircleWrapper>
            <CircleBorder percentage={progressPercentage}>
              <CircleImage src={userProfile}></CircleImage>
            </CircleBorder>
            <NumberBadge>{perfumeCount}</NumberBadge>
          </CircleWrapper>
          <ProfileTextContainer>
            <ProfileTitle>My Perfume Calendar</ProfileTitle>
            <MyPerfumeCount>
              나의 향수 기록 {perfumeCount}개
            </MyPerfumeCount>
          </ProfileTextContainer>
        </ProfileContainer>
        <MainContentContainer>
          <CalendarContainer>
          <CalendarTitle>
            <CalendarArrowIcon src={left_arrow} onClick={handlePreviousMonth} />
            {currentYear}년 {currentMonth + 1}월
            <CalendarArrowIcon src={right_arrow} onClick={handleNextMonth} />
          </CalendarTitle>
          <CalendarGuide>날짜를 선택해주세요</CalendarGuide>
            <CalendarComponent year={currentYear} month={currentMonth} />
          </CalendarContainer>
          {/* <ArrowIcon src={ic_arrow}/> */ }


          <CardContainer onClick={handleFlip}>
            <FlipCard isFlipped={isFlipped}>
              {/* 앞면 */}
              <CardFront>
                <TopDivider/>
                <ArcText src={arc_text}/>
                <PerfumeCardScentasyLine1>SCEN</PerfumeCardScentasyLine1>
                <PerfumeCardScentasyLine2>TASY</PerfumeCardScentasyLine2>
                <TheScentText>The Scent</TheScentText>
                <BottomDivider/>
              </CardFront>

              <CardBack>
              <PerfumeListTitle>
                {selectedDate ? `${currentMonth + 1}월 ${selectedDate}일의 향수` : '선택된 향수가 없습니다.'}
              </PerfumeListTitle>
                <PerfumeListGuide>향수를 선택하세요</PerfumeListGuide>
              
                <PerfumeListContainer>
                  {selectedPerfumes.length > 0 ? (
                    selectedPerfumes.map((perfume, index) => (
                      <React.Fragment key={index}>
                      <PerfumeItem
                        isSelected={selectedPerfumeId === perfume.perfumeId}
                        onClick={(event) => handleClick(event, perfume)}>
                        <span>{perfume.title}</span>
                        <MemoCount>메모 {perfume.memos ? perfume.memos.length : 0}개</MemoCount>
                      </PerfumeItem>
                      {/* 마지막 항목 뒤에는 Divider를 추가하지 않음 */}
                      {index < selectedPerfumes.length - 1 && <ListDivider />}
                    </React.Fragment>
                    ))
                  ) : (
                    <NoPerfumeItem>앗! 이 날에는 제작된 향수가 없습니다.<br/>오늘 향수를 만들어보시는 건 어떠신가요?</NoPerfumeItem>
                  )}
                </PerfumeListContainer>

                <PerfumeMemoContainer onClick={(e) => e.stopPropagation}>
                  <PerfumeMemoInput
                  placeholder="메모나 일기를 작성해주세요."
                  onClick={(e) => e.stopPropagation()}
                  value={memoContent}
                  onChange={(e) => setMemoContent(e.target.value)}
                  />
                  <MemoSubmitButton
                    src={ic_memo_submit}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMemoSubmit(); // 메모 제출
                      }}
                  />
                </PerfumeMemoContainer>
                <PerfumeDetailButton onClick={handleButtonClick}>자세히 보기</PerfumeDetailButton>
              </CardBack>
            </FlipCard>
          </CardContainer>

          {/* <PerfumeCardContainer>
            <PerfumeCardScentasyLine1>SCEN</PerfumeCardScentasyLine1>
            <PerfumeCardScentasyLine2>TASY</PerfumeCardScentasyLine2>
          </PerfumeCardContainer> */}
        </MainContentContainer>
      </ContentContainer>

      {/* 모달창 조건부 렌더링 */}
      {isModalOpen && (
        <PerfumeDetailModal closeModal={handleCloseModal} />
      )}
    </Page>
  )

};

export default CalendarPage;