import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Route, Routes } from 'react-router-dom';
import MypageMain from '../components/mypage/MypageMain';
import ChatMain from '../components/chat/ChatMain';
import CommunityMain from '../components/community/CommunityMain';
import BoardMain from '../components/community/board/BoardMain';
import DonationMain from '../components/community/donation/DonationMain';
import FaceMotionMain from '../components/community/facemotion/FaceMotionMain';

const RouterUserMain = () => {
    return (
        <div className='app'>
            <Header />

            <div className='appcontent'>
                <Routes>
                    <Route path='/chat' element={<ChatMain />} />
                    <Route path='/' element={<MypageMain />} />
                    <Route path='/community'>
                        <Route path='' element={<CommunityMain />} />
                        <Route path='board' element={<BoardMain />} />
                        <Route path='donation' element={<DonationMain />} />
                        <Route path='face' element={<FaceMotionMain />} />
                    </Route>
                </Routes>
            </div>

            <Footer />
        </div>
    );
};

export default RouterUserMain;