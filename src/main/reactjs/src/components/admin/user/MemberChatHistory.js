import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../chat/chattingroom/ChatRoomStyle.css';
import ChatLogMidbar from '../../chat/chattinglog/content/ChatLogMidbar';
import ChatLogContent from '../../chat/chattinglog/content/ChatLogContent';
import axios from 'axios';

const MemberChatHistory = () => {
    const [info, setInfo] = useState(null);
    const [roomcode, setRoomcode] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const roomcodeFromParams = params.get("chatroomcode");
        if (roomcodeFromParams) {
            setRoomcode(roomcodeFromParams);
        }
    }, [location]);

    useEffect(() => {
        if (roomcode) {
            axios.get("/chat/loginfo?chatroomcode=" + roomcode)
                .then((res) => {
                    setInfo(res.data);
                })
                .catch((error) => {
                    console.error("Error fetching chat log:", error);
                });
        }
    }, [roomcode]);

    return (
        <div>
            <div className='mx_30 chatmain'>
                <ChatLogMidbar counselorname={info?.counselorname} />
                <ChatLogContent log={info?.log} />
            </div>
        </div>
    );
};

export default MemberChatHistory;