import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pointcheck from '../../../components/mypage/point/Pointcheck';

const RouterPoint = () => {
    return (
        <Routes>
            <Route path='' element={<Pointcheck />} />
        </Routes>
    );
};

export default RouterPoint;