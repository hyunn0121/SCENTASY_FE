import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './pages/MainPage/MainPage';
import ChatPage from './pages/Chat/ChatPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<MainContent />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
