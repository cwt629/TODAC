import React from 'react';
import { useNavigate } from 'react-router-dom';

const MypageMain = () => {
    const nav = useNavigate(); 
    return (
        <div>
            <h3>마이페이지임 ㅋ</h3>
            <button className='btn btn-danger'
            onClick={() => nav('inquiry')}>1:1 문의</button>
            <button className='btn btn-danger'
            onClick={() => nav('faq')}>도움말</button>
        </div>
    );
};

export default MypageMain;