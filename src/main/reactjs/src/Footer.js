import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const nav = useNavigate();

    return (
        <div className='footer fixed-bottom text-center align-items-center'>
            <div className='footernav col'
            onClick={() => nav('/user/chat')}><img alt='chat' src={require("./image/ico_chat.png")}/></div>
            <div className='footernav col'
            onClick={() => nav('/user')}><img alt='chat' src={require("./image/ico_mypage.png")}/></div>
            <div className='footernav col'
            onClick={() => nav('/user/community')}><img alt='chat' src={require("./image/ico_community.png")}/></div>
        </div>
    );
};

export default Footer;