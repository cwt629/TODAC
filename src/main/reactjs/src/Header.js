import { Logout } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const nav = useNavigate();
    const location = useLocation();

    const [memberinfo, setMemberinfo] = useState([]);
    const id = sessionStorage.getItem("id");

    const loginType = sessionStorage.getItem("loginType");

    const getmemberinfo = () => {
        axios.post("/member/info?userid=" + id).then((res) => {
            //console.log(res.data);
            setMemberinfo(res.data);
        })
    }

    const handleLogout = () => {
        let accessToken = "Bearer " + sessionStorage.getItem("accessToken");
        console.log(accessToken);

        if (loginType === "kakao") {
            axios.post(
                "/logout/logoutCallBack", {}
            ).then(res => {
                sessionStorage.clear();
                window.location.href = res.data.url;
            });
        }

        else {
            //세션에서 토큰 제거
            sessionStorage.clear();
            //로그인 페이지로 이동
            nav('/login');
        }

    };

    useEffect(() => {
        getmemberinfo();
    }, []);

    // 뒤로 가기 버튼을 렌더링할지 여부 결정
    const showBackButton = location.pathname !== '/' && location.pathname !== '/admin';

    return (
        <div className='header fixed-top bg-white'>
            <div className='text-center mt_25'>
                <span style={{ cursor: 'pointer', color: 'var(--deepblue)' }} className='fs_24 fw_900' onClick={() => nav('/')}>TODAC</span>
            </div>

            {/* <span style={{ float: 'right', paddingRight: '10px' }}><span className='fw_900 col_blue1'>{memberinfo.nickname}</span> 님 <Logout style={{ cursor: 'pointer', width:'16px' }} onClick={() => {
                nav("/login");
            }} /> </span> */}

            <div className='d-flex mx_30 mt-1'>
                {showBackButton && (
                    <div>
                        <img alt='뒤로가기' src={require('./image/ico_back.png')} onClick={() => window.history.back()} />
                    </div>
                )}
                {
                    id &&
                    <div style={{ marginLeft: 'auto' }}>
                        <span className='fw_900'>{memberinfo.nickname}</span> 님 <Logout style={{ cursor: 'pointer', width: '16px' }} onClick={handleLogout} />
                    </div>
                }

            </div>

        </div>
    );
};

export default Header;