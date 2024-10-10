import { useEffect, useRef, useState } from "react";
import React from "react";

const ChatbotTypingEffect = ({ fullText, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef(""); // 현재 텍스트 상태를 추적하기 위한 useRef

  useEffect(() => {
    let index = 0;
    const textToDisplay = " " + fullText; // 맨 앞에 빈 스페이스 추가
    textRef.current = ""; // 텍스트 초기화

    const addCharacter = () => {
      if (index < textToDisplay.length) {
        textRef.current += textToDisplay.charAt(index); // 현재 텍스트에 문자 추가
        setDisplayedText(textRef.current); // 상태 업데이트
        index++;
        setTimeout(addCharacter, speed);
      }
    };

    // 타이핑 시작
    if (textToDisplay.length > 0) {
      addCharacter();
    }

    return () => {
      index = textToDisplay.length; // 컴포넌트가 언마운트될 때 타이핑 종료
    };
  }, [fullText, speed]);

  return <span>{displayedText.trimStart()}</span>; // 최종 출력 시 앞의 빈 스페이스 제거
};

export default ChatbotTypingEffect;