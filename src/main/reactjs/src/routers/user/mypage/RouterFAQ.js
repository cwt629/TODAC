import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Faq from '../../../components/mypage/qna/Faq';

const RouterFAQ = () => {
    return (
        <Routes>
            <Route path='' element={<Faq />} />
        </Routes>
    );
};

export default RouterFAQ;