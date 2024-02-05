import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatMain from '../../../components/chat/ChatMain';
import ChatRoomMain from '../../../components/chat/chattingroom/ChatRoomMain';

const RouterChat = () => {
    return (
        <Routes>
            <Route path='' element={<ChatMain />} />
            <Route path='counsel' element={<ChatRoomMain />} />
        </Routes>
    );
};

export default RouterChat;