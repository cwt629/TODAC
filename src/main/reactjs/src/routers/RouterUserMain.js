import React, { useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Route, Routes, useNavigate } from "react-router-dom";
import RouterChat from "./user/chat/RouterChat";
import RouterMypage from "./user/mypage/RouterMypage";
import RouterCommunityHome from "./user/community/RouterCommunityHome";
import Swal from "sweetalert2";

const RouterUserMain = () => {
    const nav = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            // Swal.fire({
            //     icon: 'error',
            //     title: '로그인 필요!',
            //     html: '로그인하셔야 이용할 수 있습니다. <br/> 로그인 페이지로 이동합니다.',
            //     confirmButtonColor: '#FF7170',
            //     confirmButtonText: '확인'
            // }).then(() => {
            //     nav("/login");
            // })
            nav("/login");
        }
    }, [])

    return (
        <div className='app'>
            <Header />

            <div className='appcontent'>
                <Routes>
                    <Route path='/chat/*' element={<RouterChat />} />
                    <Route path='/*' element={<RouterMypage />} />
                    <Route path='/community/*' element={<RouterCommunityHome />} />
                </Routes>
            </div>

            <Footer />
        </div>
    );
};

export default RouterUserMain;
