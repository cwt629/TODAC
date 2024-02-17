import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginCallBack = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');


        if (code) {
            const login = async () => {
                try {
                    const loginType = sessionStorage.getItem('loginType');
                    let params = {
                        code,
                        loginType,
                    };

                    if (loginType === 'naver') {
                        const state = urlSearchParams.get('state');
                        params.state = state;
                    }

                    const res = await axios.post("/login/getCallBack", params);
                    

                    if (res.data.Signup === 'N') {
                        if (loginType === 'naver') {
                            window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                            navigate('/login/signupnaver');
                        } else {
                            window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                            navigate('/login/signupkakao');
                        }
                    } else {
                        sessionStorage.accessToken = res.data.accessToken;
                        sessionStorage.token = res.data.token;
                        sessionStorage.id = res.data.id;
                        sessionStorage.usercode = res.data.usercode;
                        
                        navigate('/');
                    }
                } catch (error) {
                    console.error('Error during login:', error);
                    setLoading(false);
                }
            };

            login();
        }
    }, [navigate]);

    return (
        <div>
            {loading ? (
                <h1 className='col_red text-center fs_45 fw_900 login_loading'>
                    <span>상</span>
                    <span>담</span>
                    <span>사</span>
                    <span>&nbsp;</span>
                    <span>출</span>
                    <span>근</span>
                    <span>&nbsp;</span>
                    <span>중</span>
                    {/* <span>&nbsp;<img alt='스마일' src={require('../../image/ico_heart.png')}/></span> */}
                    <span>&nbsp;:)</span>
                </h1>
            ) : (
                <h1 style={{
                    color: "#FF494D",
                    textAlign: "center",
                    fontSize: "3em",
                    paddingTop: "200px",
                    fontWeight: "1000"
                }}>
                    처리 중 오류가 발생했습니다.
                </h1>
            )}
        </div>
    );
};

export default LoginCallBack;