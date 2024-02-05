import React from 'react';
import Header from '../Header';
import { Route, Routes } from 'react-router-dom';
import AdminMain from '../components/admin/AdminMain';
import MemberManage from '../components/admin/user/MemberManage';
import InquiryHistory from '../components/admin/inquiry/InquiryHistory';
import MemberProfile from '../components/admin/user/MemberProfile';
import MemberPost from '../components/admin/user/MemberPost';
import MemberComments from '../components/admin/user/MemberComments';
import MemberPayment from '../components/admin/user/MemberPayment';
import MemberPoint from '../components/admin/user/MemberPoint';
import MemberChatSearch from '../components/admin/user/MemberChatSearch';
import MemberChatHistory from '../components/admin/user/MemberChatHistory';
import InquiryResponse from '../components/admin/inquiry/InquiryResponse';
import LoginMain from '../components/login/LoginMain';

const RouterAdminMain = () => {
    return (
        <div className='app'>
            <Header />
            <div className='appcontent nofooter'>
                <Routes>
                    <Route path='/'>
                        <Route path='' element={<AdminMain />} />
                        <Route path='MemberManage' element={<MemberManage />} />
                        <Route path='InquiryHistory' element={<InquiryHistory />} />
                        <Route path='inquiryHistory/InquiryResponse' element={<InquiryResponse />} />
                        <Route path='MemberManage/MemberProfile' element={<MemberProfile />} />
                        <Route path='MemberManage/MemberProfile/MemberPost' element={<MemberPost />} />
                        <Route path='MemberManage/MemberProfile/MemberComment' element={<MemberComments />} />
                        <Route path='MemberManage/MemberProfile/MemberPayment' element={<MemberPayment />} />
                        <Route path='MemberManage/MemberProfile/MemberPoint' element={<MemberPoint />} />
                        <Route path='MemberManage/MemberProfile/MemberChatSearch' element={<MemberChatSearch />} />
                        <Route path='MemberManage/MemberProfile/MemberChatSearch/MemberChatHistory' element={<MemberChatHistory />} />
                        <Route path='LoginMain' element={<LoginMain />} />
                    </Route>
                </Routes>
            </div>
        </div>
    );
};

export default RouterAdminMain;