import React, { useContext} from 'react';
import './Header.css';
import { ExtraInfoContext } from '../../contexts/ExtraInfoContext';

const Header = () => {

    const { extraInfo } = useContext(ExtraInfoContext);
    const nickname = extraInfo.nickname;

    return (
        <header className="header">
        <nav className="nav">
            <ul>
            <li><a href="/about">About</a></li>
            <li><a href="#chat">Chat</a></li>
            <li><a href="#calendar">Calendar</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#mypage">My Page</a></li>
            </ul>
        </nav>
        <div className="login">
            {nickname ? (
                <span>{nickname}님 안녕하세요!</span>
            ) : (
                <a href="/login">LOGIN</a>
            )}
            <i className="settings-icon">⚙️</i>
        </div>
        </header>
    );
};

export default Header;