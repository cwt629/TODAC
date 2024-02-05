import React from 'react';

const ChatSubmit = ({ input, handleUserInput, handleInputChange }) => {
    return (
        <div>
            <input type='text' className='userinput' value={input}
                onInput={(e) => handleInputChange(e.target.value)} />
            <button type='button' className='btn btn-secondary'
                onClick={handleUserInput}>전송</button>
        </div>
    );
};

export default ChatSubmit;