import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inquiry from '../../../components/mypage/qna/Inquiry';
import InquiryForm from '../../../components/mypage/qna/InquiryForm';
import InquiryDetail from '../../../components/mypage/qna/InquiryDetail';

const RouterInquiry = () => {
    return (
        <Routes>
            <Route path=''>
                <Route path='' element={<Inquiry />} />
                <Route path='detail/:inquirycode' element={<InquiryDetail />} />
                <Route path='form' element={<InquiryForm />} />
            </Route>
        </Routes>
    );
};

export default RouterInquiry;