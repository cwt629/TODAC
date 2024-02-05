import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pointcheck from '../../../components/mypage/point/Pointcheck';
import Checkout from "../../../components/mypage/point/Checkout";

const RouterPoint = () => {
    return (
        <Routes>
            <Route path='' element={<Pointcheck />} />
            <Route path='/Checkout' element={<Checkout />} />
        </Routes>
    );
};

export default RouterPoint;