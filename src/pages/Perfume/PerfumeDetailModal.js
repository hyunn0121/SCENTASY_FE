import { React, useState } from "react";
import styled from "styled-components";

import ic_close from '../../assets/images/ic_close.png';
import ic_chart from '../../assets/images/ic_chart.png';
import ic_info from '../../assets/images/ic_info.png';

import topNoteImage1 from '../../assets/images/Flavors/bergamot.jpg';
import topNoteImage2 from '../../assets/images/Flavors/hinoki.jpg';
import middleNoteImage1 from '../../assets/images/Flavors/mint.jpg';
import middleNoteImage2 from '../../assets/images/Flavors/cedarwood.jpg';
import baseNoteImage from '../../assets/images/Flavors/mint.jpg';

/* 모달창 배치 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 20px; /* 상단에서 20px 간격 */
  bottom: 20px; /* 하단에서 20px 간격 */
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 40px); /* 상하 간격을 제외한 전체 높이 */
`;

const ModalContent = styled.div`
  width: 350px;
  height: 650px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
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

const PerfumeDescription = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Regular";
  text-align: left;
  color: #666666;
  line-height: 1.5;
  max-height: 150px;
  overflow-y: auto;
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

const NotesTop = styled.p`
  font-size: 14px;
  font-famiily: "Pretendard-Black";
  text-align: left;
`;

const NoteItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const NoteImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const NoteTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const NoteTitle = styled.p`
  font-size: 14px;
  font-family: "Pretendard-Bold";
  margin: 0;
  text-align: left;
`;

const NoteName = styled.p`
  font-size: 12px;
  font-family: "Pretendard-Regular";
  margin: 0;
  text-align: left;
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

const PerfumeDetailModal = ({ closeModal }) => {

  const [isTooltipVisible, setTooltipVisible] = useState(false)

  const handleMouseEnter = () => {
    setTooltipVisible(true)
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const exampe_perfumeDescription =
  "중요한 순간에 자신감을 높여주는 우아하고 정돈된 향입니다. 상쾌한 시트러스 노트로 시작해 은은한 백합과 자스민의 플로럴 어코드가 지적이고 우아한 분위기를 연출합니다. 베이스로는 따뜻한 샌달우드와 머스크가 안정감 있는 마무리를 만들어 긴장 속에서도 차분함과 자신감을 유지하게 해줍니다."

  return (
    <ModalOverlay>
      <ModalContent>
        <PerfumeTopContainer>
          <PerfumeTitle>Fresh Start</PerfumeTitle>
          <CloseIcon src={ic_close} onClick={closeModal}></CloseIcon>
        </PerfumeTopContainer>
        <PerfumeSubName>면접날의 향수</PerfumeSubName>
        <PerfumeDescription>{exampe_perfumeDescription}</PerfumeDescription>
        
        <Divider/>
        
        <NoteContainer>
          <NotesTop>Notes</NotesTop>
        </NoteContainer>

        {/* Top Notes */}
        <NoteItem>
          <NoteImage src={topNoteImage1} />
          <NoteImage src={topNoteImage2} />
          <NoteTextContainer>
            <NoteTitle>Top Notes</NoteTitle>
            <NoteName>bergamot & hinoki</NoteName>
          </NoteTextContainer>
        </NoteItem>

        {/* Middle Notes */}
        <NoteItem>
          <NoteImage src={middleNoteImage1} />
          <NoteImage src={middleNoteImage2} />
          <NoteTextContainer>
            <NoteTitle>Middle Notes</NoteTitle>
            <NoteName>mint & cedarwood</NoteName>
          </NoteTextContainer>
        </NoteItem>

        {/* Base Notes */}
        <NoteItem>
          <NoteImage src={baseNoteImage} />
          <TransparentImage/>
          <NoteTextContainer>
            <NoteTitle>Base Notes</NoteTitle>
            <NoteName>mint</NoteName>
          </NoteTextContainer>
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

      </ModalContent>
    </ModalOverlay>
  )

};

export default PerfumeDetailModal;