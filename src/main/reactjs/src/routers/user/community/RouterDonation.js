import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DonationMain from '../../../components/community/donation/DonationMain';

const RouterDonation = () => {
    return (
        <Routes>
            <Route path='' element={<DonationMain />} />
        </Routes>
    );
};

export default RouterDonation;