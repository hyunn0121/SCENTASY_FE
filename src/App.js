import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './pages/MainPage/MainPage';

import ChatPage from './pages/Chat/ChatPage';
import LoginPage from './pages/Auth/LoginPage';
import SignUpPage from './pages/Auth/SignUpPage';
import MainPage from './pages/MainPage/MainPage';
import AddInfoPage from './pages/Auth/AddInfoPage';
import LikeScentPage from './pages/Auth/LikeScentPage';
import UnlikeScentPage from './pages/Auth/UnlikeScentPage';
import { ExtraInfoProvider } from './contexts/ExtraInfoContext';
import CalendarPage from './pages/Calendar/CalendarPage';

function App() {
  return (
    <Router>
      <ExtraInfoProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/about" element={<MainPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/addInfo" element={<AddInfoPage />} />
            <Route path="/likeScent" element={<LikeScentPage />} />
            <Route path="/unlikeScent" element={<UnlikeScentPage />} />
          </Routes>
        </div>
      </ExtraInfoProvider>
    </Router>
  );
}

export default App;
