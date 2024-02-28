import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background2 from "../../image/bg_startmain2.png";

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
                nav('/user/chat');
            }
        }
    }, [token, nav]);

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
        <div className='login_main' m
        
        // style={{
        //     backgroundImage: `url(${background2})`,
        //     backgroundSize: "contain",
        //     backgroundRepeat: "no-repeat"
        // }}
        >

            {/* <h1 style={{
                color: "#FF494D", textAlign: "center",
                fontSize: "3em", fontWeight: "1000"
            }}>TODAC</h1> */}
            <div className="main_ani">
                <div className="animation">
                    <span className="one_text">T</span>
                    <span className="two_t typewriter">&nbsp;his app may</span>
                    <br />
                    <span className="one_text">O</span>
                    <span className="two_t typewriter2">&nbsp;ffer you</span>
                    <br />
                    <span className="one_text">D</span>
                    <span className="two_t typewriter3">&nbsp;ream</span>
                    <br />
                    <span className="one_text">A</span>
                    <span className="two_t typewriter4">&nbsp;nd</span>
                    <br />
                    <span className="one_text">C</span>
                    <span className="two_t typewriter5">&nbsp;omfort</span>
                </div>
            </div>

            {/* <button className='btn btn-success'
                onClick={naverLoginEvt}
                style={{ width: "100%" }}>네이버 로그인
            </button> */}
            <button className='btn_naver'
                onClick={naverLoginEvt}>
                <div className='main_login'>
                    <img alt='네이버 로그인' src={require('../../image/btn_naver.png')} className='img_fluid w_25' />
                    <div>네이버 로그인</div>
                </div>
            </button>

            <button className='btn_kakao mb-3'
                onClick={kakaLoginEvt}>
                <div className='main_login'>
                    <img alt='카카오 로그인' src={require('../../image/btn_kakao.png')} className='img_fluid w_25' />
                    <div>카카오 로그인</div>
                </div>
            </button>

            <hr />

            <button className='btn_admin mt-3'
                onClick={() => nav('admin')}>
                <div className='main_login'>
                    <img alt='관리자 로그인' src={require('../../image/btn_admin.png')} className='img_fluid w_25' />
                    <div>관리자 로그인</div>
                </div>
            </button>
        </div>
    );
};

export default LoginMain;