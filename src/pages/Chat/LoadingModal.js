import React, { useEffect } from "react";
import styled from "styled-components";

import perfumeLoading from '../../assets/images/perfume_loading.gif';

const CircleContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px; /* Progress Circle과 CenteredPopUp을 감싸기 위해 약간 크게 설정 */
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1500;
`;

const CenteredPopUp = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1501; /* SVG 테두리보다 앞에 오도록 설정 */
`;

const PerfumeGif = styled.img`
  width: 150px;
  height: 150px;
  margin-left: 10px;
  object-fit: cover;
  border-radius: 50%;
`;

const LoadingText = styled.p`
  font-family: "Pretendard-SemiBold";
  font-size: 16px;
  color: #797C7B;
  text-align: center;
`;

const CircularProgress = styled.svg`
  position: absolute;
  width: 260px;
  height: 260px;
  transform: rotate(-90deg);
  z-index: 1500; /* CenteredPopUp 보다 뒤에 오도록 설정 */

  circle {
    stroke: #00656D;
    stroke-width: 7;
    fill: none;
    stroke-dasharray: 785; /* 이 값은 원주와 동일해야 합니다 */
    stroke-dashoffset: 785;
    animation: progress 30s linear forwards;
  }

  @keyframes progress {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

const LoadingModal = ({ isVisible, onClose }) => {

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 30000); // 30초 후 자동으로 모달 닫기
      return () => clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머를 클리어
    }
  }, [isVisible, onClose]);

  if (!isVisible)
    return null;

  return (
    <CircleContainer>
      <CircularProgress>
        <circle cx="130" cy="130" r="125" />
      </CircularProgress>
      <CenteredPopUp>
        <PerfumeGif src={perfumeLoading} alt="Loading..." />
        <LoadingText>당신의 향기가<br /> 완성되는 중입니다...</LoadingText>
      </CenteredPopUp>
    </CircleContainer>
  );
};

export default LoadingModal;
