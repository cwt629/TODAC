import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnaStyle.css';

const MypageMain = () => {
    const nav = useNavigate();

    useEffect(()=>{
        const storedToken = sessionStorage.getItem("token");
        const storedId = sessionStorage.getItem("id");
        console.log("Stored t:", storedToken,", Stored id:", storedId);
    },[]);

    const handleLogout =  () => {
        // 세션에서 토큰 제거
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");

        // 로그인 페이지로 이동
        nav('/login');
    };

    return (
        <div>
            <h3>마이페이지임 ㅋ</h3>
            <button className='btn btn-danger'
                    onClick={() => nav('inquiry')}>1:1 문의
            </button>
            <button className='btn btn-danger'
                    onClick={() => nav('faq')}>도움말
            </button>
            <button type='button' className='btn btn-danger' onClick={handleLogout}>
                로그아웃
            </button>
            <button className='btn btn-info'
                    onClick={() => nav('point')}>포인트
            </button>
        </div>
    );
};

export default MypageMain;