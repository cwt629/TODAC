import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inquiry from '../../../components/mypage/qna/Inquiry';

const RouterInquiry = () => {
    return (
        <Routes>
            <Route path='' element={<Inquiry />} />
        </Routes>
    );
};

export default RouterInquiry;