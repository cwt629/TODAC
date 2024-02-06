import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatMain from '../../../components/chat/ChatMain';
import ChatRoomMain from '../../../components/chat/chattingroom/ChatRoomMain';
import ChatSummary from '../../../components/chat/document/ChatSummary';
import ChatDiagnosis from '../../../components/chat/document/ChatDiagnosis';

const RouterChat = () => {
    return (
        <Routes>
            <Route path='' element={<ChatMain />} />
            <Route path='counsel' element={<ChatRoomMain />} />
            <Route path='summary' element={<ChatSummary />} />
            <Route path='diagnosis' element={<ChatDiagnosis />} />
        </Routes>
    );
};

export default RouterChat;