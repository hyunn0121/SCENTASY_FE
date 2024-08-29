import React, { useState } from 'react';
import styled from 'styled-components';

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
  white-space: nowrap;
  justify-content: ${props => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: ${props => (props.isUser ? '0 0 0 10px' : '0 10px 0 0')};
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
  border: 1px solid #ddd;
  border-radius: 5px;
  max-height: 400px;
  resize: none;
  overflow-y: auto;
  background-color: #F3F6F6;
  font-size: 20px;
  font-family: "Pretendard-SemiBold";
  ::placeholder {
    font-size: 16px;
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.disabled ? '#ddd' : '#8FBFFA')};
  color: #ffffff;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => (props.disabled ? '#ddd' : '#66AAD8')};
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
  border: 2px solid #000000;
  background-color: #ffffff;
  color: #000000;
  cursor: pointer;

  &:hover {
    border-color: #00656D;
  }
`;


const ChattingPage = () => {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [responseCount, setResponseCount] = useState(0); // 응답 카운터
  const [showPopup, setShowPopup] = useState(false); // 팝업 표시 상태

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
        const memberId = 1;
        
        if (!accessToken) {
          throw new Error('No access token found');
        }

        if (!memberId) {
          throw new Error('No access token found');
        }

        const url = `/api/chats/${memberId}`;

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
  
        const data = await response.json();
        const botMessage = {
          text: data.response,
          isUser: false,
          time: new Date().toLocaleTimeString()
        };
  
        newMessages[currentChatId].push(botMessage);
        setMessages({ ...newMessages });

        setResponseCount(prevCount => {
          const newCount = prevCount + 1;
          console.log(`Response Count: ${newCount}`);
          setShowPopup(true); // 조건 없이 팝업을 무조건 표시
          return newCount;
        });

        // 응답 카운트 업데이트
        setResponseCount(prevCount => {
          const newCount = prevCount +1;
          console.log(`Response Count: ${newCount}`);

          if (newCount === 5) {
            console.log('Showing Popup'); // 팝업 표시 확인
            setShowPopup(true); // 팝업 표시 상태 업데이트
          }

          return newCount;
        });

      } catch (error) {
        console.error("Error sending message:", error);
        // alert("오류가 발생하였습니다. 다시 시도해주세요.")
      }
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
    setResponseCount(0); // 팝업을 닫으면서 응답 카운트 초기화
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
                  <MessageContent isUser={msg.isUser}>{msg.text}</MessageContent>
                  <TimeStamp isUser={msg.isUser}>{msg.time}</TimeStamp>
                </MessageWrapper>
                {msg.isUser && <ProfileImage src={user} alt="User Profile" isUser />}
              </Message>
            ))}
          </MessageList>
          {showPopup && (
            <Popup>
                <PopupButton onClick={handleClosePopup}>향수 만들기</PopupButton>
                <PopupButton onClick={handleClosePopup}>채팅 계속 하기</PopupButton>
              </Popup>
          )}
          <InputArea>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your message"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim()}>Send</Button>
          </InputArea>
        </ChatArea>
      </ChatBody>
    </ChatContainer>
  );
};

export default ChattingPage;