import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CommunityMain from '../../../components/community/CommunityMain';
import RouterBoard from './RouterBoard';
import RouterDonation from './RouterDonation';
import RouterGame from './RouterGame';

const RouterCommunityHome = () => {
    return (
        <Routes>
            <Route path='/' element={<CommunityMain />} />
            <Route path='/board/*' element={<RouterBoard />} />
            <Route path='/donation/*' element={<RouterDonation />} />
            <Route path='/game/*' element={<RouterGame />} />
        </Routes>
    );
};

export default RouterCommunityHome;