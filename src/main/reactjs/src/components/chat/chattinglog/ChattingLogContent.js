import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../PageHeader';
import '../chattingroom/ChatRoomStyle.css';
import ChatLogMidbar from './content/ChatLogMidbar';
import ChatLogContent from './content/ChatLogContent';
import ChatLogButtons from './content/ChatLogButtons';
import axios from 'axios';

const ChattingLogContent = () => {
    const nav = useNavigate();
    const [info, setInfo] = useState(null);

    const [query, setQuery] = useSearchParams();
    const roomcode = query.get("roomcode");

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '상담기록', url: '/user/chat/loglist' },
        { name: '상담일지', url: '' }
    ];

    const PAGE_TITLE = '나의 상담일지';

    useEffect(() => {
        axios.get("/chat/loginfo?chatroomcode=" + roomcode)
            .then((res) => {
                console.log(res.data)
                setInfo(res.data);
            })
    }, []);

    const handleSummaryClick = () => {
        nav("../summary?roomcode=" + roomcode);
    }

    const handleDiagnosisClick = () => {
        nav("../diagnosis?chatroomcode=" + roomcode);
    }

    return (
        <div className='mx_30 chatmain'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <ChatLogMidbar counselorname={info?.counselorname} />
            <ChatLogContent log={info?.log} />
            <ChatLogButtons hasDiagnosis={info && info.diagnosisCount > 0}
                handleSummaryClick={handleSummaryClick}
                handleDiagnosisClick={handleDiagnosisClick} />
        </div>
    );
};
export default ChattingLogContent;