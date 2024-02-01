import React from 'react';
import Header from '../Header';
import { Route, Routes } from 'react-router-dom';
import AdminMain from '../components/admin/AdminMain';

const RouterAdminMain = () => {
    return (
        <div className='app'>
            <Header/>
            <div className='appcontent nofooter'>
            <Routes>
                <Route path='/' element={<AdminMain/>}/>
            </Routes>
            </div>
        </div>
    );
};

export default RouterAdminMain;