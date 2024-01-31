import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const nav = useNavigate();

    return (
        <div className='footer'>
            <div className='footernav'
            onClick={() => nav('/user/chat')}>Chat</div>
            <div className='footernav'
            onClick={() => nav('/user')}>Mypage</div>
            <div className='footernav'
            onClick={() => nav('/user/community')}>Community</div>
        </div>
    );
};

export default Footer;