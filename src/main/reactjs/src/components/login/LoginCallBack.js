import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const LoginCallBack = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [token,setToken] = useState(null);
    const [id,setId] = useState(null);

    useEffect(()=>{
        const storedToken = sessionStorage.getItem("token");
        const storedId = sessionStorage.getItem("id");
        console.log("Stored t:", storedToken,", Stored id:", storedId);
    },[]);

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');

        
        if (code) {
            const login = async () => {
                try {
                    const loginType = window.sessionStorage.getItem('loginType');
                    let params = {
                        code,
                        loginType,
                    };

                    if (loginType === 'naver') {
                        const state = urlSearchParams.get('state');
                        params.state = state;
                    }

                    const res = await axios.post("/login/getCallBack", params);
                    sessionStorage.token = res.data.token;
                    setToken(res.data.token);
                    sessionStorage.id = res.data.id;
                    setId(res.data.id);

                    if (res.data.Signup === 'N') {
                        if (loginType === 'naver') {
                            window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                            navigate('/login/signupnaver');
                        } else {
                            window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
                            navigate('/login/signupkakao');
                        }
                    } else {
                        navigate('/user');
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
                <h1 style={{
                    color: "#FF494D",
                    textAlign: "center",
                    fontSize: "3em",
                    paddingTop: "200px",
                    fontWeight: "1000"
                }}>Loading... <br/><br/> 잠시만<br/> 기다려주세요</h1>
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