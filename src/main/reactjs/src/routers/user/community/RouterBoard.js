import React from 'react';
import { Route, Routes } from 'react-router-dom';
import BoardMain from '../../../components/community/board/BoardMain';
import BoardForm from '../../../components/community/board/BoardForm';

const RouterBoard = () => {
    return (
        <Routes>
            <Route path='' element={<BoardMain />} />
            <Route path='form' element={<BoardForm />} />
        </Routes>
    );
};

export default RouterBoard;