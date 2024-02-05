import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RouterUserMain from './RouterUserMain';
import RouterStartMain from './RouterStartMain';
import RouterLoginMain from './RouterLoginMain';
import RouterAdminMain from './RouterAdminMain';
import Success from '../components/mypage/point/Success'
import Fail from '../components/mypage/point/Fail'

const RouterMain = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<RouterStartMain />} />
                <Route path='/login/*' element={<RouterLoginMain />} />
                <Route path='/user/*' element={<RouterUserMain />} />
                <Route path='/admin/*' element={<RouterAdminMain />} />
                <Route path='/success/*' element={<Success />} />
                <Route path='/fail/*' element={<Fail />} />

            </Routes>
        </div>
    );
};

export default RouterMain;