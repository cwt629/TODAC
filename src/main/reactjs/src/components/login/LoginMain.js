import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginMain = () => {
    const [token,setToken] = useState(null);
    const nav = useNavigate();

    useEffect(()=>{
        const storedToken = sessionStorage.getItem("token");
        setToken(storedToken);
    },[]);


    useEffect(() => {
        if (token) {
            const storedId = sessionStorage.getItem("id");
            if (storedId === "todac"){
                nav('/admin');
            } else {
                nav('/user');
            }
        }
    }, [token]);

    //소셜 로그인 url
    let kakaoLoginUrl = '';
    let naverLoginUrl = '';
    axios.post("/login/socialLogin", {})
        .then( res => {
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
        <div style={{paddingTop : "150px", paddingRight : "55px", paddingLeft : "55px"}}>

            <h1 style={{color : "#FF494D", textAlign: "center",
                        fontSize : "3em", fontWeight : "1000"
                        }}>TODAC</h1>

            <br/><br/><br/>

            <button className='btn btn-success'
             onClick={naverLoginEvt}
             style={{width : "100%"}}>네이버 로그인</button>

            <br/><br/>

            <button className='btn btn-warning'
             onClick={kakaLoginEvt}
             style={{width : "100%"}}>카카오 로그인</button>

            <br/><br/><br/>
            <hr/>
            <br/><br/>

            <button className='btn btn-secondary'
                onClick={() => nav('admin')}
                style={{width : "100%"}}>관리자 로그인</button>
        </div>
    );
};

export default LoginMain;