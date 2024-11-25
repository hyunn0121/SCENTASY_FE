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
import Mypage from './pages/Mypage/Mypage';
import CommunityPage from './pages/Community/CommunityPage';
import WritePost from './pages/Community/WrtiePost';
import DetailPost from './pages/Community/DetailPost';
import ChangeAddInfoPage from './pages/Mypage/ChangeAddInfoPage';
import ChangelikeScentPage from './pages/Mypage/ChangelikeScentPage';
import ChangeunlikeScentPage from './pages/Mypage/ChangeunlikeScentPage';
import ScentIntro from './pages/MainPage/ScentIntro';

function App() {
  return (
    <Router>
      <ExtraInfoProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/about" element={<MainPage />} />
            <Route path="/scentIntro" element={<ScentIntro />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/writePost" element={<WritePost />} />
            <Route path="/detailPost" element={<DetailPost />} />
            <Route path="/mypage" element={<Mypage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/addInfo" element={<AddInfoPage />} />
            <Route path="/likeScent" element={<LikeScentPage />} />
            <Route path="/unlikeScent" element={<UnlikeScentPage />} />
            <Route path="/changeAddInfo" element={<ChangeAddInfoPage/> } />
            <Route path="/changelikeScent" element={<ChangelikeScentPage/>} />
            <Route path="/changeunlikeScent" element={<ChangeunlikeScentPage/>} />
          </Routes>
        </div>
      </ExtraInfoProvider>
    </Router>
  );
}

export default App;
