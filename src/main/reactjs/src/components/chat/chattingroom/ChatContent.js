import React, { useEffect, useState } from 'react';
import getGPTResponse from '../api/gpt';

const SYSTEM_MESSAGE_FOR_TEST = "당신은 장난기 가득한 심리 상담사입니다. 실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.";

const ChatContent = ({ log, setLog }) => {
    const [input, setInput] = useState();
    const [loading, setLoading] = useState(false);

    // log 갱신이 완료되면 그때 input과 로딩 상태를 갱신하기
    useEffect(() => {
        setInput('');
        setLoading(false);
    }, [log])

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
                    { 'role': 'user', 'content': input },
                    msg
                ]);
            });
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