import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginMain from '../components/login/LoginMain';
import LoginAdmin from '../components/login/LoginAdmin';

const RouterLoginMain = () => {
    return (
        <div className='login'>
            
            <Routes>
                <Route path='/'>
                    <Route path='' element={<LoginMain />} />
                    <Route path='admin' element={<LoginAdmin />} />
                </Route>
            </Routes>
            
        </div>
    );
};

export default RouterLoginMain;