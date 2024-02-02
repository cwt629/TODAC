import React, { useState } from 'react';
import ChatContent from './ChatContent';

const ChatRoomMain = () => {
    const [log, setLog] = useState([]);

    return (
        <div style={{ padding: '15px' }}>
            <h3>
                어느 상담사와 마음 공유중...
                <button className='btn btn-danger' style={{ float: 'right' }}>종료</button>
            </h3>
            <ChatContent log={log} setLog={setLog} />
        </div>
    );
};

export default ChatRoomMain;