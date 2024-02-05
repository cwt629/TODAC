import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginCallBack = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');

        console.log('Authorization Code:', code);

        const login = async () => {
            const loginType = window.sessionStorage.getItem('loginType');
           
            let params = {
                  code
                , loginType
            };

            if(loginType == 'naver') {
                const state = urlSearchParams.get('state');
                params.state = state;
            }

            axios.post("/login/getCallBack", params)
                .then( res => {

                if(res.data.Signup == 'N') {
                    if(loginType == 'naver'){
                        window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                        navigate('/login/signupnaver');
                    } else {
                        window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                        navigate('/login/signupkakao');
                    }
                        
                } else {
                    navigate('/user');
                }
            });


        };

        login();
        
    }, []);

    return (
        <div>{loading ? 'Loading 기다려주시겠습니까?' : '처리 중 오류가 발생했습니다.'}</div>
    );
};

export default LoginCallBack;