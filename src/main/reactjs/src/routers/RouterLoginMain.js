import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginMain from '../components/login/LoginMain';

const RouterLoginMain = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginMain/>}/>
            </Routes>
        </div>
    );
};

export default RouterLoginMain;