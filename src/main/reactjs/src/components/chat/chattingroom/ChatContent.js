import React, { useEffect, useState } from 'react';
import getGPTResponse from '../api/gpt';

const SYSTEM_MESSAGE_FOR_TEST = "당신은 장난기 가득한 심리 상담사입니다. 실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.";

const ChatContent = ({ log, setLog }) => {
    const [input, setInput] = useState();

    useEffect(() => {
        console.log(process.env.REACT_APP_OPENAI_API_KEY);
    }, []);

    const handleUserInput = () => {
        getGPTResponse(input, SYSTEM_MESSAGE_FOR_TEST, setLog, log);
        setInput('');
    }

    return (
        <div>
            <input type='text' className='userinput' value={input}
                onInput={(e) => setInput(e.target.value)} />
            <button type='button' className='btn btn-secondary'
                onClick={handleUserInput}>전송</button>
            {
                log.map((data, index) => (
                    <div key={index} style={{ backgroundColor: 'yellow', color: 'indigo', padding: '5px', borderRadius: '10px' }}>
                        {data.content}
                    </div>
                ))
            }
        </div>
    );
};

export default ChatContent;