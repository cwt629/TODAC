import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Route, Routes } from "react-router-dom";
import MypageMain from "../components/mypage/MypageMain";
import ChatMain from "../components/chat/ChatMain";
import CommunityMain from "../components/community/CommunityMain";
import BoardMain from "../components/community/board/BoardMain";
import DonationMain from "../components/community/donation/DonationMain";
import FaceMotionMain from "../components/community/facemotion/FaceMotionMain";
import ChatRoomMain from "../components/chat/chattingroom/ChatRoomMain";
import Faq from "../components/mypage/qna/Faq";
import Inquiry from "../components/mypage/qna/Inquiry";
import BoardForm from "../components/community/board/BoardForm";

const RouterUserMain = () => {
    return (
        <div className='app'>
            <Header />

            <div className='appcontent'>
                <Routes>
                    <Route path='/chat'>
                        <Route path='' element={<ChatMain />} />
                        <Route path='counsel' element={<ChatRoomMain />} />
                    </Route>
                    <Route path='/'>
                        <Route path='' element={<MypageMain />} />

                        <Route path='faq' element={<Faq/>} />
                        <Route path='inquiry' element={<Inquiry/>} />

                    </Route>
                    <Route path='/community'>
                        <Route path='' element={<CommunityMain />} />
                        <Route path='board'>
                            <Route path='' element={<BoardMain />} />
                            <Route path='form' element={<BoardForm />} />
                        </Route>

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
