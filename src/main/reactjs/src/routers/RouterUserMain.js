import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Route, Routes } from 'react-router-dom';
import MypageMain from '../components/mypage/MypageMain';
import ChatMain from '../components/chat/ChatMain';
import CommunityMain from '../components/community/CommunityMain';

const RouterUserMain = () => {
    return (
        <div className='app'>
            <Header/>

            <Routes>
                <Route path='/chat' element={<ChatMain/>}/>
                <Route path='/' element={<MypageMain/>}/>
                <Route path='/community' element={<CommunityMain/>}/>
            </Routes>

            <Footer/>
        </div>
    );
};

export default RouterUserMain;