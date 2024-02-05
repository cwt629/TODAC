import React, { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMidBar from './ChatRoomMidBar';
import './ChatRoomStyle.css'
import getGPTResponse from '../api/gpt';
import ChatSubmit from './ChatSubmit';

const ChatRoomMain = () => {
    const [log, setLog] = useState([]);
    const [input, setInput] = useState();
    const [loading, setLoading] = useState(false);

    const SYSTEM_MESSAGE_FOR_TEST = "당신은 장난기 가득한 심리 상담사입니다. 실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.";

    // log 갱신이 완료되면 그때 input과 로딩 상태를 갱신하기
    useEffect(() => {
        setInput('');
        setLoading(false);
    }, [log])

    const handleInputChange = (newInput) => {
        setInput(newInput);
    }

    const handleUserInput = () => {
        if (loading) {
            alert("상담사가 아직 답변중입니다. 잠시 후 시도해주세요.");
            return;
        }

        if (input.length === 0) {
            alert("메세지를 입력해주세요.");
            return;
        }

        setLoading(true);
        getGPTResponse(input, SYSTEM_MESSAGE_FOR_TEST, log)
            .then((msg) => {
                setLog([
                    ...log,
                    { 'role': 'user', 'content': input, 'speaker': 0 },
                    { ...msg, 'speaker': 1 }
                ]);
            });
    }

    return (
        <div style={{ padding: '15px' }}>
            <ChatRoomHeader />
            <ChatRoomMidBar />
            <ChatContent log={log} />
            <ChatSubmit input={input} handleInputChange={handleInputChange} handleUserInput={handleUserInput} />
        </div>
    );
};

export default ChatRoomMain;