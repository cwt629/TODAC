import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MypageMain from '../../../components/mypage/MypageMain';
import RouterFAQ from './RouterFAQ';
import RouterInquiry from './RouterInquiry';
import RouterPoint from './RouterPoint';

const RouterMypage = () => {
    return (
        <Routes>
            <Route path='/' element={<MypageMain />} />
            <Route path='/faq/*' element={<RouterFAQ />} />
            <Route path='/inquiry/*' element={<RouterInquiry />} />
            <Route path='/point/*' element={<RouterPoint />} />

        </Routes>
    );
};

export default RouterMypage;