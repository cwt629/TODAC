import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QnaStyle.css';
import axios from "axios";

const MypageMain = () => {
    const [member, setmember] = useState([]);
    const nav = useNavigate();

    const storedId = sessionStorage.getItem("id");
    const loginType = sessionStorage.getItem("loginType");
    const usercode = sessionStorage.getItem("usercode");

    useEffect(() => {
        getmember();
        console.log("storedId:", storedId, ", usercode:", usercode);
    }, []);

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);
                console.log(res.data);
            })
    }

    const handleLogout = () => {
        let accessToken = "Bearer " + sessionStorage.getItem("accessToken");
        console.log(accessToken);

        if (loginType === "kakao") {
          axios.post(
            "https://kapi.kakao.com/v1/user/logout",
            {},
            {
              headers: { Authorization : accessToken },
            }
          );
        }
    
        // 세션에서 토큰 제거
        sessionStorage.clear();

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