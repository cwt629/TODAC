import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Community_ico} from "./image/ico_community.svg"
import { ReactComponent as Chat_ico} from "./image/ico_chat.svg"
import { ReactComponent as Mypage_ico} from "./image/ico_mypage.svg"
const Footer = () => {
    const nav = useNavigate();

    return (
        <div className='footer fixed-bottom text-center align-items-center'>
            <div className='footernav col'
            onClick={() => nav('/user/chat')}><Chat_ico className='footer_ico'/></div>
            <div className='footernav col'
            onClick={() => nav('/user')}><Mypage_ico className='footer_ico'/></div>
            <div className='footernav col'
            onClick={() => nav('/user/community')}><Community_ico className='footer_ico'/></div>
        </div>
    );
};

export default Footer;