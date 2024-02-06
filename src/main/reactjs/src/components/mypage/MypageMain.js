import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnaStyle.css';
import axios from "axios";

const MypageMain = () => {
    const [member, setmember] = useState([]);
    const nav = useNavigate();
    const storedId = sessionStorage.getItem("id");

    const getmember = () => {
        const url = "/member/list?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);
                console.log(res.data);
            })
    }

    useEffect(() => {
        const storedId = sessionStorage.getItem("id");
        getmember();
        console.log("Stored t:", storedToken, ", Stored id:", storedId);
    }, [getmember]);

    const handleLogout = () => {
        // 세션에서 토큰 제거
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("id");

        // 로그인 페이지로 이동
        nav('/login');
    };

    return (
        <div>
            <h3>내 정보</h3>
            <img alt='' src={member.photo} />
            <h1>{member.nickname}</h1>
            <h1>포인트 : {member.point}</h1>
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