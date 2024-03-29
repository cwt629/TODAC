import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Pointcheck from '../../../components/mypage/point/Pointcheck';
import Checkout from "../../../components/mypage/point/Checkout";
import Success from "../../../components/mypage/point/Success";
import Fail from "../../../components/mypage/point/Fail";
import Pointcharge from "../../../components/mypage/point/Pointcharge";

const RouterPoint = () => {
    return (
        <Routes>
            <Route path='' element={<Pointcheck />} />
            <Route path='/Checkout' element={<Checkout />} />
            <Route path='/success/*' element={<Success />} />
            <Route path='/fail/*' element={<Fail />} />
            <Route path='/charge' element={<Pointcharge />} />
        </Routes>
    );
};

export default RouterPoint;