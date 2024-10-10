import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import apiClient from '../Auth/TokenReissue';
import LoadingModal from './LoadingModal';
import RatingModal from './RatingModal';
import ChatbotTypingEffect from "./ChatbotTypingEffect";

import ic_addChat from '../../assets/images/ic_addChat.png';
import ic_Search from '../../assets/images/ic_search.png';
import default_profile_iamge from '../../assets/images/default_profile_image.png';
import user from '../../assets/images/user.png';
import chatbot from '../../assets/images/chatbot.png';
import PerfumeRecipeModal from './PerfumeRecipeModal';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 85vh;
  position: relative;
  background-color: #FBF8EB;
`;

const ChatBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden; /* 전체 영역에서 스크롤을 방지 */
`;

const Sidebar = styled.div`
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
  overflow-y: auto;
  font-family: "Pretendard-ExtraLight";
  position: relative;
  border-radius: 0px 30px 0px 0px;
  border: 1px solid #ddd;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0px 0px;
  background-color: #FBF8EB;
  
  position: relative;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto; /* 메시지 리스트만 스크롤 가능하게 설정 */
  padding: 20px;
  font-family: "Pretendard-ExtraLight";
  margin-bottom: 120px;
`;

const Message = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')}; // 사용자 -> 오른쪽, 챗봇 -> 왼쪽
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: ${props => (props.isUser ? '0 0 0 10px' : '0 10px 0 0')}; // 사용자 메시지 이미지와 챗봇 메시지 이미지의 위치 조정
`;

const MessageWrapper = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isUser ? 'flex-end' : 'flex-start')}; // 사용자 메시지와 챗봇 메시지의 텍스트 정렬 조정
`;

const MessageContent = styled.div`
  padding: 20px 30px;
  border-radius: 10px;
  text-align: left;
  background-color: ${props => (props.isUser ? '#ffe0b2' : '#e0e0e0')};
  // word-wrap: break-word; /* 긴 단어나 URL이 박스를 넘지 않도록 줄바꿈 */
  font-family: "Pretendard-Regular";
  // display: inline-block; /* 메시지 박스가 텍스트 크기에 맞게 줄어들도록 함 */
  // white-space: pre-wrap; /* 긴 텍스트가 박스 내에서 줄바꿈이 되도록 설정 */
  // overflow-wrap: break-word; /* 너무 긴 단어가 있을 경우 줄바꿈 */
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  text-align: ${props => (props.isUser ? 'right' : 'left')};
`;

const InputArea = styled.div`
  width: 100%; /* ChatArea의 너비에 맞게 */
  padding: 20px;
  position: absolute;
  bottom: 10px; /* ChatArea의 하단에 고정 */
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.textarea`
  width: 60%;
  padding: 20px;
  border: 2px solid #E0E0E0;
  border-radius: 20px;
  max-height: 200px;
  resize: none;
  overflow-y: auto;
  background-color: #ffffff;
  outline: none;
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  ${({ disabled }) => disabled && `
  background-color: #E0E0E0;
  cursor: not-allowed;
  `}

  ::placeholder {
    font-size: 14px;
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 100px;
  height: 60px;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.disabled ? '#E0E0E0' : '#00656D')};
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  ${({ disabled }) => disabled && `
    background-color: #ddd;
    cursor: not-allowed;
  `}

  &:hover {
    background-color: ${props => (props.disabled ? '#E0E0E0' : '#00656D')};
  }
`;

const ChatItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #000000;
  border-radius: 10px;
  background-color: ${props => (props.isSelected ? '#E1EBF7' : '#ffffff')};
  &:hover {
    background-color: #E1EBF7;
    border-radius: 10px;
    font-family: "Pretendard-SemiBold";
  }
`;

const ChatItemText = styled.div`
  margin-left: 10px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding: 0 10px;
  box-sizing: border-box;
  margin-left: 10px;
  margin-right: 10px;
`;

const SearchIcon = styled.img`
  width: 24px; /* 아이콘 크기 조정 */
  height: 24px; /* 아이콘 크기 조정 */
  margin-right: 0px; /* 아이콘과 텍스트 필드 사이의 간격 조정 */
`;

const SearchText = styled.input`
  width : 150px;
  border: none;
  background: transparent; /* 배경색 제거 */
  color: #000000;
  font-size: 16px;
  padding: 12px;
  text-align: center; /* 텍스트 중앙 정렬 */
  outline: none;

  ::placeholder {
    color: #B5B7C0;
    font-weight: bold;
  }
`;

const NewChatButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const NewChatButton = styled.button`
  width: 50px;
  height: 30px;
  padding: 20px 14px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  background-image: url(${ic_addChat});
  background-size: 20px 20px; /* 이미지 크기 조정 */
  background-repeat: no-repeat;
  background-position: center;
`;

const Popup = styled.div`
  position: absolute;
  bottom: 100px; /* InputArea 바로 위에 배치되도록 설정 */
  transform: translateX(-50%);
  left: 50%;
  width: 300px;
  padding: 20px;
  z-index: 1000;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  justify-content: space-between; /* 두 버튼 사이에 최대한의 공간을 부여 */
  border: none;
`;

const PopupButton = styled.button`
  width: 150px;
  height: 40px;
  margin-right: 20px;
  white-space: nowrap;
  padding: 10px 20px;
  border-radius: 20px;
  border: 2px solid #00656D;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;
  font-family: "Pretendard-SemiBold";

  &:hover {
    background-color: #00656D;
    border-color: #ffffff;
    color: #ffffff;
  }
`;

const ChattingPage = () => {
  const [userProfile, setUserProfile] = useState(default_profile_iamge);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [responseCount, setResponseCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPersistent, setPopupPersistent] = useState(true);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);
  const [isPerfumeRecipeModalVisible, setIsPerfumeRecipeModalVisible] = useState(false);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);
  const messageEndRef = useRef(null);

  const [perfumeRecipe, setPerfumeRecipe] = useState([]);

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

        const response = await apiClient.get(`/api/mypage/${memberId}`);

        const { data } = response.data;
        if (response.data.code === '0000') {
          setUserProfile(data.imageUrl || default_profile_iamge)
        } else {
          console.error("사용자 정보 조회 실패", data.message);
        }
      } catch (error) {
        console.error("사용자 정보 불러오기 오류", error)
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        isUser: true,
        time: new Date().toLocaleTimeString()
      };
  
      let currentChatId = selectedChat;
  
      if (currentChatId === null) {
        currentChatId = chatList.length;
        setChatList([...chatList, { id: currentChatId, name: `Chat ${currentChatId + 1}` }]);
        setSelectedChat(currentChatId);
      }
  
      const newMessages = { ...messages };
      newMessages[currentChatId] = newMessages[currentChatId]
        ? [...newMessages[currentChatId], newMessage]
        : [newMessage];
  
      setMessages(newMessages);
      setInput('');

      try {

        const accessToken = localStorage.getItem('accessToken');
        const memberId = localStorage.getItem('memberId');

        if (!accessToken) {
          throw new Error('No access token found');
        }

        if (!memberId) {
          throw new Error('No access token found');
        }

        const url = `/api/chats/${memberId}`;

        const response = await apiClient.post(url, { input });
  
        // 응답에서 code와 data를 추출
      const { code, data } = response.data;

      // code가 성공 상태인 경우에만 처리
      if (code === "0000") {
        setTimeout(() => {
          const botMessage = {
            text: data.response,
            isUser: false,
            time: new Date().toLocaleTimeString(),
          };

          newMessages[currentChatId].push(botMessage);
          setMessages({ ...newMessages });

          setResponseCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount >= 1) {
              setShowPopup(true);
            }
            return newCount;
          });
        }, 3000);
      } else {
        throw new Error(`Error from server: ${response.data.message}`);
      }

    } catch (error) {
      console.error('Error sending message:', error);
    }
    }
  };

  // 향수 레시피 서버 요청
  const generatePerfumerRecipe = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const url = `${process.env.REACT_APP_API_KEY}/api/perfume/recipe`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`응답 실패 - Status: ${response.status}, Text: ${errorText}`);
      }

      const responseData = await response.json();
      console.log('응답 데이터:', responseData);

      const { code, data } = responseData;
      const notes = data.notes;

      if (code === "0000" && notes) {
        console.log("향수 레시피 생성 성공:", notes);
        setPerfumeRecipe(notes);
        alert("향수 레시피 생성이 완료되었습니다!");
      } else {
        throw new Error(`Error from server: ${responseData.message}`);
      }

    } catch (error) {
      console.error('향수 레시피 생성 실패:', error);
      alert("향수 레시피 생성에 실패했습니다.");
    }
  };


  const handleLoadingModal = () => {
    setShowPopup(false);
    setPopupPersistent(false);
    setIsInputDisabled(true);
    setIsLoadingModalVisible(true);

    // 향수 레시피 생성 api
    generatePerfumerRecipe();

    setTimeout(() => {
      setIsLoadingModalVisible(false);
      setIsRatingModalVisible(true);
    }, 30000);
  };

  // 상태 변경 추적을 위한 useEffect
useEffect(() => {
  console.log('isLoadingModalVisible changed:', isLoadingModalVisible);
}, [isLoadingModalVisible]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsInputDisabled(false);
  };

  const handleNewChat = () => {
    const newChat = { id: chatList.length, name: `Chat ${chatList.length + 1}` };
    setChatList([...chatList, newChat]);
    setSelectedChat(newChat.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatItemClick = (index) => {
    setSelectedChat(index);
  };

  const handleOpenPerfumeRecipeModal = async () => {
    setShowPopup(false); // 팝업 버튼 2개 닫기

    await generatePerfumerRecipe();

    setIsPerfumeRecipeModalVisible(true);
  };

  const handleClosePerfumeRecipeModal = () => {
    setIsPerfumeRecipeModalVisible(false);
  };

  const handlePerfumeMakeButtonClick = () => {
    setIsPerfumeRecipeModalVisible(false);
    setIsLoadingModalVisible(true);

    setTimeout(() => {
      setIsLoadingModalVisible(false);
      setIsRatingModalVisible(true);
    }, 30000);
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalVisible(false); // RatingModal 닫기 함수 추가
    alert("향수 평가가 완료되었습니다!\n해당 평가는 다음 향수 제작에 활용됩니다.")
  };

  return (
    <ChatContainer>
      <ChatBody>
        <Sidebar>
          <NewChatButtonContainer>
            <SearchBar><SearchIcon src={ic_Search}/><SearchText placeholder='SEARCH'/></SearchBar>
            <NewChatButton onClick={handleNewChat}/>
          </NewChatButtonContainer>
          {chatList.map((chat) => (
            <ChatItem
              key={chat.id}
              isSelected={selectedChat === chat.id}
              onClick={() => handleChatItemClick(chat.id)}
            >
              <ChatItemText>{chat.name}</ChatItemText>
            </ChatItem>
          ))}
        </Sidebar>
        <ChatArea>
          <MessageList>
            {selectedChat !== null && messages[selectedChat] && messages[selectedChat].map((msg, index) => (
              <Message key={index} isUser={msg.isUser}>
                {!msg.isUser && <ProfileImage src={chatbot} alt="Bot Profile" />}
                <MessageWrapper isUser={msg.isUser}>
                  <MessageContent isUser={msg.isUser}>
                    {msg.isUser ? (
                      msg.text
                    ) : (
                      <ChatbotTypingEffect fullText={msg.text} speed={50} />
                    )}
                  </MessageContent>
                  <TimeStamp isUser={msg.isUser}>{msg.time}</TimeStamp>
                </MessageWrapper>
                {msg.isUser && <ProfileImage src={userProfile} alt="User Profile" isUser />}
              </Message>
            ))}
            <div ref={messageEndRef} /> {/* 이 부분을 추가하여 자동 스크롤이 되도록 설정 */}
          </MessageList>
          {showPopup && (
            <Popup>
              <PopupButton onClick={handleOpenPerfumeRecipeModal}>향수 레시피 생성하기</PopupButton>
              <PopupButton onClick={handleClosePopup}>채팅 계속 하기</PopupButton>
            </Popup>
          )}

          {/* PerfumeRecipeModal 렌더링 */}
          {isPerfumeRecipeModalVisible && (
            <PerfumeRecipeModal
              recipe={perfumeRecipe} 
              onClose={handleClosePerfumeRecipeModal}
              onMake={handlePerfumeMakeButtonClick}
            />
          )}
          
          <InputArea>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write your message"
              disabled={isInputDisabled}
            />
            <Button onClick={handleSendMessage} disabled={isInputDisabled || !input.trim()}>Send</Button>
          </InputArea>
        </ChatArea>
      </ChatBody>

      <LoadingModal 
        isVisible={isLoadingModalVisible}
        onClose={() => setIsLoadingModalVisible(false)} 
      />
      {isRatingModalVisible && <RatingModal onClose={handleCloseRatingModal} />} {/* RatingModal 렌더링 */}
    </ChatContainer>
  );
};

export default ChattingPage;
