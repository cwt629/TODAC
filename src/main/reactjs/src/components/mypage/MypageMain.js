import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QnaStyle.css';

const MypageMain = () => {
    const nav = useNavigate();
    return (
        <div>
            <h3>마이페이지임 ㅋ</h3>
            <button className='btn btn-danger'
                onClick={() => nav('inquiry')}>1:1 문의</button>
            <button className='btn btn-danger'
                onClick={() => nav('faq')}>도움말</button>
            <button className='btn btn-info'
                onClick={() => nav('point')}>포인트</button>
        </div>
    );
};

export default MypageMain;