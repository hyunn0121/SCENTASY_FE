import React from 'react';
import './Header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <nav className="nav">
                <ul>
                    <li><a href="#about">About</a></li>
                    <li><a href="/chat">Chat</a></li>
                    <li><a href="#calendar">Calendar</a></li>
                    <li><a href="#community">Community</a></li>
                    <li><a href="#mypage">My Page</a></li>
                </ul>
            </nav>
            <div className="login">
                <a href="#login">LOGIN</a>
                <span>님 안녕하세요!</span>
                <i className="settings-icon">⚙️</i>
            </div>
        </header>
    );
};

export default Header;