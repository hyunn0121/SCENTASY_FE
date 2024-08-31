import React, { useState } from 'react';
import styled from 'styled-components';
import LoadingModal from './LoadingModal';

import ic_addChat from '../../assets/images/ic_addChat.png';
import ic_Search from '../../assets/images/ic_search.png';
import user from '../../assets/images/user.png';
import chatbot from '../../assets/images/chatbot.png';


const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
`;

const ChatBody = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #EEF1F6;
  padding: 20px;
  overflow-y: auto;
  font-family: "Pretendard-ExtraLight";
  position: relative;
  border-radius: 30px;
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 50px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  font-family: "Pretendard-ExtraLight";
`;

const Message = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')}; // 사용자 메시지는 오른쪽, 챗봇 메시지는 왼쪽
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: ${props => (props.isUser ? '0 0 0 10px' : '0 10px 0 0')}; // 사용자 메시지 이미지와 챗봇 메시지 이미지의 위치 조정
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isUser ? 'flex-end' : 'flex-start')}; // 사용자 메시지와 챗봇 메시지의 텍스트 정렬 조정
`;

const MessageContent = styled.div`
  max-width: 40%;  /* 메시지 박스의 최대 너비를 제한 */
  padding: 20px 30px;
  border-radius: 10px;
  background-color: ${props => (props.isUser ? '#ffe0b2' : '#e0e0e0')};
  word-wrap: break-word; /* 긴 단어나 URL이 박스를 넘지 않도록 줄바꿈 */
  font-family: "Pretendard-Regular";
  display: inline-block; /* 메시지 박스가 텍스트 크기에 맞게 줄어들도록 함 */
  white-space: normal; /* 짧은 텍스트는 한 줄로 표시되도록 설정 */
  word-break: keep-all; /* 단어를 가능한 한 통째로 유지하여 줄바꿈 */
  overflow-wrap: break-word; /* 너무 긴 단어가 있을 경우 줄바꿈 */
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  text-align: ${props => (props.isUser ? 'right' : 'left')};
`;

const InputArea = styled.div`
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 150px 50px 150px;
  gap: 10px;
  position: relative;
`;

const Input = styled.textarea`
  width: 80%;
  padding: 10px;
  border: 2px solid #E0E0E0;
  border-radius: 5px;
  max-height: 400px;
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
  background-color: ${props => (props.disabled ? '##E0E0E0' : '#00656D')};
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: ${props => (props.isSelected ? '#E1EBF7' : 'transparent')};
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
  align-items: center;
  width: 250px; /* 폭을 조정하여 텍스트 필드와 아이콘의 레이아웃을 맞춤 */
  height: 50px;
  margin-bottom: 35px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #FFFFFF;
  padding: 0 10px;
  box-sizing: border-box;
  margin-right: 30px;
`;

const SearchIcon = styled.img`
  width: 24px; /* 아이콘 크기 조정 */
  height: 24px; /* 아이콘 크기 조정 */
  margin-right: 8px; /* 아이콘과 텍스트 필드 사이의 간격 조정 */
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
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const NewChatButton = styled.button`
  width: 50px;
  height: 50px;
  padding: 14px;
  border: none;
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
  bottom: 180px; /* InputArea 바로 위에 배치되도록 설정 */
  left: 50%;
  transform: translateX(-50%); /* 수평 가운데 정렬 */
  width: 300px;
  padding: 20px;
  z-index: 1000;
  text-align: center;
  display: flex;
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
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [responseCount, setResponseCount] = useState(0); // 응답 카운터
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태
  const [popupPersistent, setPopupPersistent] = useState(true); // 팝업 지속 상태
  const [isInputDisabled, setIsInputDisabled] = useState(false); // 입력 비활성화 상태
  const [isLoadingModalVisible, setIsLoadingModalVisible] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {

      // 사용자(나) 메시지 생성
      const newMessage = {
        text: input,
        isUser: true,
        time: new Date().toLocaleTimeString()
      };
  
      // 현재 선택된 채팅 ID
      let currentChatId = selectedChat;

      // const newChatList = [...chatList];
  
      if (currentChatId === null) {
        currentChatId = chatList.length;
        setChatList([...chatList, { id: currentChatId, name: `Chat ${currentChatId + 1}` }]);

        // 새로운 채팅방 생성 후 해당 채팅방을 자동으로 선택
        setSelectedChat(currentChatId);
      }
  
      // 메시지를 채팅 리스트에 추가
      const newMessages = { ...messages };
      newMessages[currentChatId] = newMessages[currentChatId]
        ? [...newMessages[currentChatId], newMessage]
        : [newMessage];
  
      setMessages(newMessages);
      setInput('');

      /*
      console.log(`Setting showPopup to true`);
      setShowPopup(true); // 팝업 표시
      */
  
      try {

        // localStorage에서 토큰 가져오기
        const accessToken = localStorage.getItem('accessToken');
        const memberId = localStorage.getItem('memberId');
        
        if (!accessToken) {
          throw new Error('No access token found');
        }

        if (!memberId) {
          throw new Error('No access token found');
        }

        const url = `${process.env.REACT_APP_API_KEY}/api/chats/${memberId}`;

        // 서버에 메시지 전송
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ input })
        });
  
        if (!response.ok) {
          // 응답이 OK가 아니면, 상태 코드와 텍스트를 확인하여 디버깅
          const errorText = await response.text(); // 응답의 텍스트를 읽어들임
          throw new Error(`Network response was not ok. Status: ${response.status}, Text: ${errorText}`);
        }

        // 응답을 JSON으로 파싱
        const responseData = await response.json();

        // 응답에서 code와 data를 추출
        const { code, data } = responseData;

        // code가 성공 상태인 경우에만 처리
        if (code === "0000") {
          const botMessage = {
            text: data.response,
            isUser: false,
            time: new Date().toLocaleTimeString(),
          };

          newMessages[currentChatId].push(botMessage);
          setMessages({ ...newMessages });

          setResponseCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount >= 5 && popupPersistent) {
              setShowPopup(true);
              setIsInputDisabled(true);
            }
            return newCount;
          });
        } else {
          throw new Error(`Error from server: ${responseData.message}`);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터키로 줄바꿈 방지
      handleSendMessage(); // 메시지 전송
    }
  };

  const handleChatItemClick = (index) => {
    setSelectedChat(index);
  };

  const handleNewChat = () => {
    const newChat = { id: chatList.length, name: `Chat ${chatList.length + 1}` };
    setChatList([...chatList, newChat]);
    setSelectedChat(newChat.id);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsInputDisabled(false); // 채팅 계속하기를 클릭하면 입력 활성화됨
    // setResponseCount(0); // 팝업을 닫으면서 응답 카운트 초기화
  };

  const handlePerfumeCreation = () => {
    setPopupPersistent(false); // 향수 만들기 버튼을 눌렀을 때 더이상 팝업 뜨지 X
    setShowPopup(false); // 팝업 숨김
    setIsLoadingModalVisible(true);

    setTimeout(() => {
      setIsLoadingModalVisible(false);
    }, 30000); // 30초 = 30000ms
  }

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
                  <MessageContent isUser={msg.isUser}>{msg.text}</MessageContent>
                  <TimeStamp isUser={msg.isUser}>{msg.time}</TimeStamp>
                </MessageWrapper>
                {msg.isUser && <ProfileImage src={user} alt="User Profile" isUser />}
              </Message>
            ))}
          </MessageList>
          {showPopup && (
            <Popup>
                <PopupButton onClick={handlePerfumeCreation}>향수 만들기</PopupButton>
                <PopupButton onClick={handleClosePopup}>채팅 계속 하기</PopupButton>
              </Popup>
          )}
          <InputArea>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} // Enter 키 눌림 감지
              placeholder="Write your message"
              disabled={isInputDisabled}
            />
            <Button onClick={handleSendMessage} disabled={isInputDisabled || !input.trim()}>Send</Button>
          </InputArea>
        </ChatArea>
      </ChatBody>

      {/* LoadingModal 렌더링 */}
      <LoadingModal 
        isVisible={isLoadingModalVisible} 
        onClose={() => setIsLoadingModalVisible(false)} 
      />
    </ChatContainer>
  );
};

export default ChattingPage;