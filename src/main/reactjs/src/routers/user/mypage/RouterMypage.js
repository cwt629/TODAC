import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MypageMain from '../../../components/mypage/MypageMain';
import RouterFAQ from './RouterFAQ';
import RouterInquiry from './RouterInquiry';
import RouterPoint from './RouterPoint';
import MyPageUpdateForm from "../../../components/mypage/update/MyPageUpdateForm";

const RouterMypage = () => {
    return (
        <Routes>
            <Route path='/' element={<MypageMain />} />
            <Route path='/faq/*' element={<RouterFAQ />} />
            <Route path='/inquiry/*' element={<RouterInquiry />} />
            <Route path='/point/*' element={<RouterPoint />} />
            <Route path='/update/*' element={<MyPageUpdateForm />} />
            <Route path='/myboard/*' element={<MyPageUpdateForm />} />
            <Route path='/donate/*' element={<MyPageUpdateForm />} />

        </Routes>
    );
};

export default RouterMypage;