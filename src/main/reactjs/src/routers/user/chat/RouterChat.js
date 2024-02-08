import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatMain from '../../../components/chat/ChatMain';
import ChatRoomMain from '../../../components/chat/chattingroom/ChatRoomMain';
import ChatSummary from '../../../components/chat/document/ChatSummary';
import ChatDiagnosis from '../../../components/chat/document/ChatDiagnosis';
import ChattingLogList from '../../../components/chat/chattinglog/ChattingLogList';
import ChattingLogContent from '../../../components/chat/chattinglog/ChattingLogContent';

const RouterChat = () => {
    return (
        <Routes>
            <Route path='' element={<ChatMain />} />
            <Route path='counsel' element={<ChatRoomMain />} />
            <Route path='summary' element={<ChatSummary />} />
            <Route path='diagnosis' element={<ChatDiagnosis />} />
            <Route path='loglist' element={<ChattingLogList />} />
            <Route path='logcontent' element={<ChattingLogContent />} />
        </Routes>
    );
};

export default RouterChat;