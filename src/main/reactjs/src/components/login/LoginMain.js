import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from "../../image/bg_startmain2.png";
import background2 from "../../image/ico_babytodac3.png";

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
        <div className='login_main' 
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "auto 45%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: 'center bottom 50%'
        }} >
            <div className='background-overlay' style={{ background: 'linear-gradient(to bottom, var(--lightgray2), var(--mainblack))',opacity: 0.28, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
            
            <div className='mx-5 d-flex justify-content-between' style={{ position: 'relative', zIndex: 1, textAlign:'center', height:'70%', flexDirection:'column'}}>
                <div className='fw_900 col_blue2' style={{fontSize:'60px'}}>TODAC</div>
                <div>
                    <button className='btn_naver bor_db'
                        onClick={naverLoginEvt}>
                        <div className='main_login'>
                            <img alt='네이버 로그인' src={require('../../image/btn_naver.png')} className='img_fluid w_25' />
                            <div>네이버 로그인</div>
                        </div>
                    </button>

                    <button className='btn_kakao bor_db mb-4'
                        onClick={kakaLoginEvt}>
                        <div className='main_login'>
                            <img alt='카카오 로그인' src={require('../../image/btn_kakao.png')} className='img_fluid w_25' />
                            <div>카카오 로그인</div>
                        </div>
                    </button>

                    <button className='btn_admin mt-3 bor_db'
                        onClick={() => nav('admin')}>
                        <div className='main_login'>
                            <img alt='관리자 로그인' src={require('../../image/btn_admin.png')} className='img_fluid w_25' />
                            <div>관리자 로그인</div>
                        </div>
                    </button>

                </div>
                
                </div>
        </div>
    );
};

export default LoginMain;