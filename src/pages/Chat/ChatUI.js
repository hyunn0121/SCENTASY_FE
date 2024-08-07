import React, { useState } from 'react';
import styled from 'styled-components';

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
  width: 350px;
  background-color: #EEF1F6;
  padding: 20px;
  overflow-y: auto;
  font-family: "Pretendard-ExtraLight";
  position: relative;
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 50px 100px 50px 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
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
  max-width: 50%;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: ${props => (props.isUser ? '#ffe0b2' : '#e0e0e0')};
  word-break: break-word;
  font-family: "Pretendard-Regular";
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: gray;
  margin-top: 5px;
  text-align: ${props => (props.isUser ? 'right' : 'left')};
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px 150px 50px 150px;
  gap: 10px;
`;

const Input = styled.textarea`
  flex: 1;
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

const NewChatButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;

const NewChatButton = styled.button`
  width: 180px;
  height: 60px;
  padding: 10px;
  border: none;
  border-radius: 50px;
  background-color: #FFFFFF;
  color: #000000;
  cursor: pointer;
  font-size: 15px;
  font-family: "Pretendard-SemiBold";
  text-align: center;
`;

const ChatUI = () => {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatList, setChatList] = useState([]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        text: input,
        isUser: true,
        time: new Date().toLocaleTimeString()
      };
  
      const newChatList = [...chatList];
      let currentChatId = selectedChat;
  
      if (currentChatId === null) {
        currentChatId = newChatList.length;
        newChatList.push({
          id: currentChatId,
          name: input.substring(0, 10)
        });
        setChatList(newChatList);
      }
  
      const newMessages = { ...messages };
      newMessages[currentChatId] = newMessages[currentChatId]
        ? [...newMessages[currentChatId], newMessage]
        : [newMessage];
  
      setMessages(newMessages);
      setInput('');
  
      try {
        const response = await fetch('http://43.201.51.245:5000/update_conditions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_input: input })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const botMessage = {
          text: `${data.description}\n\nRecipe:\n${Object.entries(data.recipe).map(([key, value]) => `${key}: ${value}`).join('\n')}`,
          isUser: false,
          time: new Date().toLocaleTimeString()
        };
  
        newMessages[currentChatId].push(botMessage);
        setMessages({ ...newMessages });
      } catch (error) {
        console.error("Error sending message:", error);
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

  return (
    <ChatContainer>
      <ChatBody>
        <Sidebar>
          <NewChatButtonContainer>
            <NewChatButton onClick={handleNewChat}>+ New Chat</NewChatButton>
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
                {!msg.isUser && <ProfileImage src="/images/chatbot.png" alt="Bot Profile" />}
                <MessageWrapper isUser={msg.isUser}>
                  <MessageContent isUser={msg.isUser}>{msg.text}</MessageContent>
                  <TimeStamp isUser={msg.isUser}>{msg.time}</TimeStamp>
                </MessageWrapper>
                {msg.isUser && <ProfileImage src="/images/user.png" alt="User Profile" isUser />}
              </Message>
            ))}
          </MessageList>
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

export default ChatUI;