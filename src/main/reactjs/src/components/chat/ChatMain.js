import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatMain = () => {
    const nav = useNavigate();

    return (
        <div>
            <button className='btn btn-info'
                onClick={() => nav('counsel')}>상담 시작</button>
        </div>
    );
};

export default ChatMain;