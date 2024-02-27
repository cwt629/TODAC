import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CommunityIco } from "./image/ico_community.svg"
import { ReactComponent as ChatIco } from "./image/ico_chat.svg"
import { ReactComponent as MypageIco } from "./image/ico_mypage.svg"
const Footer = () => {
    const nav = useNavigate();

    return (
        <div className='footer fixed-bottom text-center align-items-center'>
            <div className='footernav col'
                onClick={() => nav('/user/chat')}><ChatIco className='footer_ico' /></div>
            <div className='footernav col'
                onClick={() => nav('/user/community')}><CommunityIco className='footer_ico' /></div>
            <div className='footernav col'
                onClick={() => nav('/user')}><MypageIco className='footer_ico' /></div>
        </div>
    );
};

export default Footer;