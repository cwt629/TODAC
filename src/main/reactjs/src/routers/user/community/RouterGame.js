import React from 'react';
import { Route, Routes } from 'react-router-dom';
import GameMain from '../../../components/community/game/GameMain';

const RouterGame = () => {
    return (
        <Routes>
            <Route path='' element={<GameMain />} />
        </Routes>
    );
};

export default RouterGame;