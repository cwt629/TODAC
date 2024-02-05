import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Route, Routes } from "react-router-dom";
import RouterChat from "./user/chat/RouterChat";
import RouterMypage from "./user/mypage/RouterMypage";
import RouterCommunityHome from "./user/community/RouterCommunityHome";

const RouterUserMain = () => {
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
