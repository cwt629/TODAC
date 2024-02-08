import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogoutCallBack = () => {
    console.log("===================== sfdfdfafasfsd");
    const nav = useNavigate();

    useEffect(() => {
        // 세션에서 토큰 제거
        sessionStorage.clear();

        // 로그인 페이지로 이동
        nav('/login');

        console.log("=======================");
    });

    return (
        <div>

        </div>
    );
};

export default LogoutCallBack;