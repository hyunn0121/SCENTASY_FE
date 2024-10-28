import Typed from 'typed.js';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledTypingText = styled.div`
  font-family: "Pretendard-Bold";
  font-size: 50px;
  line-height: 1.5;
  color: #000000;
  white-space: pre-wrap;
  min-height: 200px;
  width: 100%;
  text-align: center;
  display: block;
  overflow: hidden;
  padding: 20px;
  z-index: 10;
  justify-content: center;
`;

const TypingTextContainer = () => {
    const containerRef = useRef(null);
    const typedInstance = useRef([]);
    const strings = ["내가 원하는 향수를", "지금 바로", "나만의 향기로 표현하세요!"].filter(Boolean);

    useEffect(() => {
      if (containerRef.current) {
        typedInstance.current.forEach(instance => instance.destroy());
        typedInstance.current = [];
  
        // 각 문장을 개별 div에 출력
        strings.forEach((text, index) => {
          const lineDiv = document.createElement("div");
          lineDiv.style.marginBottom = "20px";
          containerRef.current.appendChild(lineDiv);

          const typed = new Typed(lineDiv, {
            strings: [text],
            typeSpeed: 50,
            backSpeed: 25,
            startDelay: index * 1000, // 각 문장마다 딜레이 추가
            loop: false,
            showCursor: false,
            onComplete: () => console.log(`타이핑 완료: ${text}`),
          });
          
          typedInstance.current.push(typed);
        });
      }
  
      return () => {
        typedInstance.current.forEach(instance => instance.destroy());
      };
    }, []);
  
    return <StyledTypingText ref={containerRef} />;
  };

export default TypingTextContainer;
