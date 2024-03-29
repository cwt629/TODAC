import React from "react";
import { Route, Routes } from "react-router-dom";
import MypageMain from "../../../components/mypage/MypageMain";
import RouterFAQ from "./RouterFAQ";
import RouterInquiry from "./RouterInquiry";
import RouterPoint from "./RouterPoint";
import MyPageUpdateForm from "../../../components/mypage/update/MyPageUpdateForm";
import MyBoardMain from "../../../components/mypage/myboard/MyBoardMain";
import DonationContent from "../../../components/mypage/donate/DonationContent";
import BadgeMain from "../../../components/mypage/badge/BadgeMain";

const RouterMypage = () => {
    return (
        <Routes>
            <Route path='/' element={<MypageMain />} />
            <Route path='/faq/*' element={<RouterFAQ />} />
            <Route path='/inquiry/*' element={<RouterInquiry />} />
            <Route path='/point/*' element={<RouterPoint />} />
            <Route path='/update/*' element={<MyPageUpdateForm />} />
            <Route path='/myboard/*' element={<MyBoardMain />} />
            <Route path='/donate/*' element={<DonationContent />} />
            <Route path='/badge/*' element={<BadgeMain />} />
        </Routes>
    );
};

export default RouterMypage;
