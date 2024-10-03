import { useEffect, useState } from "react";
import React from "react";

const ChatbotTypingEffect = ({ fullText, speed }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prevText) => prevText + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval); // 컴포넌트가 언마운트될 때 interval을 초기화
  }, [fullText, speed]);

  return <span>{displayedText}</span>
}

export default ChatbotTypingEffect;