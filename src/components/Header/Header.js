import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Header.css';
import logo from '../../assets/images/ic_logo.png';

const Header = () => {
    const navigate = useNavigate();
    const nickname = localStorage.getItem('nickname'); // localStorage에서 닉네임 가져오기
    const isLoggedIn = !!nickname; // 닉네임이 있으면 로그인 상태로 간주

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('nickname'); // 로그아웃 시 닉네임 삭제
    
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo-container">
                <a href="/about">
                <img src={logo} alt="Logo" className="logo" />
                </a>
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/chat">Chat</a></li>
                    <li><a href="#calendar">Calendar</a></li>
                    <li><a href="#community">Community</a></li>
                    <li><a href="#mypage">My Page</a></li>
                </ul>
            </nav>
            <div className="login">
                {isLoggedIn ? (
            <>
                <span>{nickname}님 안녕하세요!</span>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </>
            ) : (
            <a href="/login">LOGIN</a>
            )}
                <i className="settings-icon">⚙️</i>
            </div>
        </header>
    );
};

export default Header;