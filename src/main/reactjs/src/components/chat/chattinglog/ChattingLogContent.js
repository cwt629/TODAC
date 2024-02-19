import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../PageHeader';
import '../chattingroom/ChatRoomStyle.css';
import ChatLogMidbar from './content/ChatLogMidbar';
import ChatLogContent from './content/ChatLogContent';
import ChatLogButtons from './content/ChatLogButtons';

const ChattingLogContent = () => {
    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '상담기록', url: '/user/chat/loglist' },
        { name: '상담일지', url: '' }
    ];

    const PAGE_TITLE = '나의 상담일지';

    return (
        <div className='mx_30 chatmain'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <ChatLogMidbar />
            <ChatLogContent />
            <ChatLogButtons />
        </div>
    );
};
export default ChattingLogContent;