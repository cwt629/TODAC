import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inquiry from '../../../components/mypage/qna/Inquiry';
import InquiryForm from '../../../components/mypage/qna/InquiryForm';

const RouterInquiry = () => {
    return (
        <Routes>
            <Route path=''>
                <Route path='' element={<Inquiry />} />
                <Route path='form' element={<InquiryForm />} />
            </Route>
        </Routes>
    );
};

export default RouterInquiry;