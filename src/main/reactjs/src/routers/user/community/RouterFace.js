import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FaceMotionMain from '../../../components/community/facemotion/FaceMotionMain';

const RouterFace = () => {
    return (
        <Routes>
            <Route path='' element={<FaceMotionMain />} />
        </Routes>
    );
};

export default RouterFace;