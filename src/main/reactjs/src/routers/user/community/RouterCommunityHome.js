import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommunityMain from '../../../components/community/CommunityMain';
import RouterBoard from './RouterBoard';
import RouterDonation from './RouterDonation';
import RouterFace from './RouterFace';

const RouterCommunityHome = () => {
    return (
        <Routes>
            <Route path='/' element={<CommunityMain />} />
            <Route path='/board/*' element={<RouterBoard />} />
            <Route path='/donation/*' element={<RouterDonation />} />
            <Route path='/face/*' element={<RouterFace />} />
        </Routes>
    );
};

export default RouterCommunityHome;