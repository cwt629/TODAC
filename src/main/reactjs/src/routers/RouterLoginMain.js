import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginMain from '../components/login/LoginMain';
import LoginAdmin from '../components/login/LoginAdmin';
import LoginCallBack from '../components/login/LoginCallBack';
import SignupKaKao from '../components/login/SignupKaKao';
import SignupNaver from '../components/login/SignupNaver';
import LogoutCallBack from '../components/login/LogoutCallBack';
import '../components/login/Login.css';

const RouterLoginMain = () => {
    return (
        <div className='login'>
            
            <Routes>
                <Route path='/'>
                    <Route path='' element={<LoginMain />} />
                    <Route path='admin' element={<LoginAdmin />} />
                    <Route path='callback' element={<LoginCallBack />} />
                    <Route path='signupkakao' element={<SignupKaKao />} />
                    <Route path='signupnaver' element={<SignupNaver />} />
                    <Route path='logoutcallback' element={<LogoutCallBack />} />
                </Route>
            </Routes>
            
        </div>
    );
};

export default RouterLoginMain;