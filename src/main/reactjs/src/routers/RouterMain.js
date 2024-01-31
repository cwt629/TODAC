import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RouterUserMain from './RouterUserMain';
import RouterStartMain from './RouterStartMain';
import RouterLoginMain from './RouterLoginMain';
import RouterAdminMain from './RouterAdminMain';

const RouterMain = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<RouterStartMain/>}/>
                <Route path='/login/*' element={<RouterLoginMain/>}/>
                <Route path='/user/*' element={<RouterUserMain/>}/>
                <Route path='/admin/*' element={<RouterAdminMain/>}/>
            </Routes>
        </div>
    );
};

export default RouterMain;