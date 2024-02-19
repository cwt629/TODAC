import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatLogButtons = () => {
    const nav = useNavigate();

    return (
        <div className='mt_45' style={{ textAlign: 'center', height: '55px' }}>
            <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../loglist')}>뒤로가기</button>
            &nbsp;&nbsp;
            <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../diagnosis')}>진단서 발급(500P)</button>
        </div>
    );
};

export default ChatLogButtons;