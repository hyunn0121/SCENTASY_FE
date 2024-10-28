import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { Doughnut } from 'react-chartjs-2'; // Chart.js 추가
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import axios from "axios";
import apiClient from "../Auth/TokenReissue";
import qs from 'qs';

import ic_close from '../../assets/images/ic_close.png';
import ic_chart from '../../assets/images/ic_chart.png';
import ic_info from '../../assets/images/ic_info.png';

ChartJS.register(ArcElement, ChartTooltip, Legend);

/* 모달창 배치 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 20px; /* 상단에서 20px 간격 */
  bottom: 20px; /* 하단에서 20px 간격 */
  left: 0;
  width: 110vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  height: calc(100vh - 40px); /* 상하 간격을 제외한 전체 높이 */
`;

const ModalContent = styled.div`
  width: 350px;
  max-height: 80vh;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 내용 길어짐 -> 스크롤 */
`;

const PerfumeTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PerfumeTitle = styled.p`
  font-size: 18px;
  font-family: "Pretendard-Bold";
  margin: 0;
`;

const CloseIcon = styled.img`
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const PerfumeSubName = styled.p`
  font-size: 14px;
  font-famiily: "Pretendard-Black";
  text-align: left;
  margin: 0;
`;

const DescriptionContainer = styled.div`
  margin-bottom: 10px;
`;

const PerfumeDescription = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  text-align: left;
  color: #666666;
  line-height: 1.5;
  background-color: #f0f0f0; /* 임시로 배경색 설정 */
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  z-index: 10;
`;

const Divider = styled.hr`
  width: calc(100% - 20px);
  border: none;
  border-top: 2px solid #C4C4C4;
  margin: 10px 0px;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoteGuideTitle = styled.p`
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  text-align: left;
`;

const NoteItem = styled.div`
  display: flex;
  align-items:  center;
  margin-bottom: 15px;
  min-height: 60px;
`;

const NoteImagesContainer = styled.div`
  width: 160px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 80px; // 이미지 컨테이너의 일관된 너비를 보장
  min-height: 60px;
  margin-left: 20px;
  flex-wrap: nowrap;
`;

const NoteImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NoteTextContainer = styled.div`
  width: 100px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NoteTitle = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Bold";
  margin: 0;
  text-align: center;
`;

const NoteName = styled.p`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  margin: 0;
  text-align: center;
  color: #737373;
`;

/* 빈 공간용 이미지 */
const TransparentImage = styled.div`
  width: 40px;
  height: 40px;
`;

const ChartTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ChartIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;

const ChartTitle = styled.p`
  font-size: 20px;
  font-family: "Pretendard-Regular";
  margin: 0;
`;

const Tooltip = styled.div`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  background-color: #F0F0F0;
  text-align: left;
  font-size: 12px;
  font-family: "Pretendard-Regular";
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  bottom: 130%;
  left: 50%;
  padding: 8px;
  transform: translateX(-50%);
  white-space: normal;
  width: 200px;
  max-width: 200px;
  box-sizing: border-box;
  z-index: 10;

  &::after {
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-with: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

const InfoIconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const InfoIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 4px;
  cursor: pointer;
`;

// 도넛 차트 UI
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // 화면 비율 유지 X
  cutout: '70%', // 가운데 빈 부분 크기 (퍼센트)
  plugins: {
    legend: {
      display: false, // 차트의 기본 legend 숨김
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          // 데이터 + % 형식
          const label = tooltipItem.label || '';
          const value = tooltipItem.raw || 0;
          const formattedValue = (value).toFixed(3);
          return `${label}: ${formattedValue}%`;
        },
      },
    },
  },
};

const ChartContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-right: 20px;
`;

const LabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 20px;
`;

const LabelGuide = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Regular";
  color: #808080;
`;

const LabelItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
  font-family: "Pretendard-Regular";
`;

const ColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const RemakePerfumeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const RemakePerfumeButton = styled.button`
  width: 200px;
  font-size: 16px;
  font-family: "Pretendard-Regular";
  background-color: #00656D;
  color: #ffffff;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
`;


const PerfumeDetailModal = ({ closeModal, perfumeDetail }) => {

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const { id, title, description, accords, notes } = perfumeDetail;
  console.log("향수 상세정보: ", description);

  const [noteImages, setNoteImages] = useState([]);

  // 향료 이미지 조회 api
  const fetchScentImages = async (notes) => {

    const accessToken = localStorage.getItem('accessToken');

    try {
      const response = await apiClient.get('/api/s3/scent-images', {
        params: {
          scents: notes,
        },
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        }
      });

      return response.data.data; // 향료 이미지 URL 리스트 반환
    } catch (error) {
      console.error("Error fetching scent images: ", error);
      throw new Error("Failed to fetch scent images");
    }
  };

  // 향료 이미지 가져오기
  useEffect(() => {
    const getImages = async () => {
      try {
        const noteEnValues = notes.map(note => note.note_en);
        const images = await fetchScentImages(noteEnValues);
        setNoteImages(images); // 이미지 URL 저장
      } catch (error) {
        console.error("Error loading images: ", error);
      }
    };
    getImages();
  }, [notes]);

  // 이미지 표시 함수
  const getNoteImage = (noteType, index) => {
    if (noteType === 'Top') return noteImages[index] || '';
    if (noteType === 'Middle') return noteImages[index + topNotes.length] || '';
    if (noteType === 'Base') return noteImages[index + topNotes.length + middleNotes.length] || '';

    return '';
  };
  
  const handleMouseEnter = () => {
    setTooltipVisible(true)
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  if (!perfumeDetail) {
    return null;
  }

  // note 값 나누기
  const topNotes = notes.filter(note => note.note_en.startsWith('TOP_'));
  const middleNotes = notes.filter(note => note.note_en.startsWith('MIDDLE_'));
  const baseNotes = notes.filter(note => note.note_en.startsWith('BASE_'));

  // 향조 배열 개수 -> 균등 비율
  const accordsCount = accords.length;
  const percentage = 100 / accordsCount;
  const colors =['#4bc0c0', '#ffcd56', '#ff6384', '#36a2eb', '#9966ff', '#45D777'];

  const accordsData = perfumeDetail.accords;
  // 전체 합 계산
  const totalValue = accordsData.reduce((sum, item) => sum + item.value, 0);

  // 비율 계산
  const chartValues = accordsData.map(item => (item.value / totalValue));

  // 도넛 차트(데이터 구성)
  const chartData = {
    labels: accordsData.map(item => item.accord),
    datasets: [
      { data: chartValues, // 1로 계산된 비율 적용
        backgroundColor: colors.slice(0, accordsData.length), // 최대 5개 지정
        hoverBackgroundColor: colors.slice(0, accordsData.length),
        borderWidth: 1,
      },
    ],
  };

  // 향수 만들기 버튼 클릭
  const handlePerfumeMakeClick = async () => {
    try {
      const perfumeId = perfumeDetail.perfumeId;
      // const perfumeId = 1;

      if (!perfumeId) {
        throw new Error('향수 ID가 없습니다.');
      }

      const response = await apiClient.get(`/api/perfume/device/${perfumeId}`);
      
      console.log("향수 id: ", perfumeDetail.perfumeId);
      console.log('향수 만들기 api 요청 성공', response.data);
      alert('향수 만들기 성공');
    } catch (error) {
      console.error('향수 만들기 요청 실패 :', error);
      alert('향수 만들기 요청이 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <PerfumeTopContainer>
          <PerfumeTitle>{title}</PerfumeTitle>
          <CloseIcon src={ic_close} onClick={closeModal}></CloseIcon>
        </PerfumeTopContainer>
        <DescriptionContainer>
          <PerfumeDescription>{description}</PerfumeDescription>
        </DescriptionContainer>
        
        <Divider/>
        
        <NoteContainer>
          <NoteGuideTitle>Notes</NoteGuideTitle>
        </NoteContainer>

        {/* Top Notes */}
        <NoteItem>
          <NoteTextContainer>
            <NoteTitle>Top Notes</NoteTitle>
            <NoteName>{topNotes.map(note => note.note_kr).join(' & ')}</NoteName> {/* 노트 이름 &로 연결함 */}
          </NoteTextContainer>
          <NoteImagesContainer>
            {topNotes.map((note, index) => (
              <NoteImage key={index} src={getNoteImage('Top', index)} />
            ))}
        </NoteImagesContainer>
        </NoteItem>

        {/* Middle Notes */}
        <NoteItem>
          <NoteTextContainer>
            <NoteTitle>Middle Notes</NoteTitle>
            <NoteName>{middleNotes.map(note => note.note_kr).join(' & ')}</NoteName>
          </NoteTextContainer>
          <NoteImagesContainer>
            {middleNotes.map((note, index) => (
              <NoteImage key={index} src={getNoteImage('Middle', index)} />
            ))}
          </NoteImagesContainer>
        </NoteItem>

        {/* Base Notes */}
        <NoteItem>
          <NoteTextContainer>
            <NoteTitle>Base Notes</NoteTitle>
            <NoteName>{baseNotes.map(note => note.note_kr).join(' & ')}</NoteName>
          </NoteTextContainer>
          <NoteImagesContainer>
            {baseNotes.map((note, index) => (
              <NoteImage key={index} src={getNoteImage('Base', index)} />
            ))}
          </NoteImagesContainer>
        </NoteItem>

        <Divider/>

        <ChartTitleContainer>
          <ChartIcon src={ic_chart}></ChartIcon>
          <ChartTitle>Main Accords</ChartTitle>
          <InfoIconWrapper
            onMouseEnter={handleMouseEnter}  // 마우스 올리면 툴팁 표시
            onMouseLeave={handleMouseLeave}  // 마우스 떼면 툴팁 숨기기
          >
            <InfoIcon src={ic_info} />
            <Tooltip isVisible={isTooltipVisible}>
            Top, Middle, Base Note가 섞여 만들어지는 향수의 주요 향조를 나타내는 그래프입니다.
            </Tooltip>
          </InfoIconWrapper>
        </ChartTitleContainer>
        <ChartContentContainer>
          <ChartContainer>
            {/* 도넛 차트 */}
          <div style={{ width: '150px', height: '150px' }}>
            <Doughnut data={chartData} options={chartOptions} />
          </div>

          <LabelsContainer>
            <LabelGuide> · fragrance ratio</LabelGuide>
            {accords.map((accordItem, index) => (
              <LabelItem key={index}>
                <ColorBox color={colors[index]} /> {/* 색상 박스 */}
                <span>{`${accordItem.accord}: ${accordItem.value}`}</span> {/* 향조 라벨 */}
              </LabelItem>
            ))}
          </LabelsContainer>
          </ChartContainer>
        </ChartContentContainer>
        <RemakePerfumeContainer>
          <RemakePerfumeButton onClick={handlePerfumeMakeClick}>향수 만들기</RemakePerfumeButton>
        </RemakePerfumeContainer>
      </ModalContent>
    </ModalOverlay>
  )

};

export default PerfumeDetailModal;