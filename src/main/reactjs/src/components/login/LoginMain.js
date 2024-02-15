import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginMain = () => {
    const [token, setToken] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        setToken(storedToken);
    }, []);


    useEffect(() => {
        if (token) {
            const storedId = sessionStorage.getItem("id");
            if (storedId === "todac") {
                nav('/admin');
            } else {
                nav('/');
            }
        }
    }, [token,nav]);

    //소셜 로그인 url
    let kakaoLoginUrl = '';
    let naverLoginUrl = '';
    axios.post("/login/socialLogin", {})
        .then(res => {
            naverLoginUrl = res.data.naverUrl;
            kakaoLoginUrl = res.data.kakaoUrl;
        });

    //네이버로그인
    const naverLoginEvt = () => {
        window.sessionStorage.setItem('loginType', 'naver');
        window.location.href = naverLoginUrl;
    };

    //카카오로그인
    const kakaLoginEvt = () => {
        window.sessionStorage.setItem('loginType', 'kakao');
        window.location.href = kakaoLoginUrl;
    };

    return (
        <div className='login_main'>

            {/* <h1 style={{
                color: "#FF494D", textAlign: "center",
                fontSize: "3em", fontWeight: "1000"
            }}>TODAC</h1> */}
            <div className='d-flex justify-content-center'>
                <div className='col_red fs_21 fw_400 lh_25'>
                    <spam className="fs_30 fw_900">T</spam>his app may<br/>
                    <spam className="fs_25 fw_900">O</spam>ffer you<br/>
                    <spam className="fs_25 fw_900">D</spam>ream<br/>
                    <spam className="fs_25 fw_900">A</spam>nd<br/>
                    <spam className="fs_25 fw_900">C</spam>omfort<br/>
                </div>
            </div>

            {/* <button className='btn btn-success'
                onClick={naverLoginEvt}
                style={{ width: "100%" }}>네이버 로그인
            </button> */}
            <button className='btn_naver'
                onClick={naverLoginEvt}>
                <div className='main_login'>
                    <img alt='네이버 로그인' src={require('../../image/btn_naver.png')} className='img_fluid w_25'/>
                    <div>네이버 로그인</div>
                </div>
            </button>

            <button className='btn_kakao mb-3'
                onClick={kakaLoginEvt}>
                <div className='main_login'>
                    <img alt='카카오 로그인' src={require('../../image/btn_kakao.png')} className='img_fluid w_25'/>
                    <div>카카오 로그인</div>
                </div>
            </button>

            <hr />
            
            <button className='btn_admin mt-3'
                onClick={() => nav('admin')}>
                <div className='main_login'>
                    <img alt='관리자 로그인' src={require('../../image/btn_admin.png')} className='img_fluid w_25'/>
                    <div>관리자 로그인</div>
                </div>
            </button>
        </div>
    );
};

export default LoginMain;