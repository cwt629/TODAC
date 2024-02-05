import React from 'react';

const ChatSubmit = ({ input, handleInputSubmit, handleInputChange }) => {

    return (
        <div className='chatsubmit mt_10'>
            <input type='text' className='userinput bg_gray bor_blue1' value={input}
                placeholder='내용을 입력하세요.'
                onInput={(e) => handleInputChange(e.target.value)}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        handleInputSubmit();
                    }
                }} />
            <div className='bor_blue1 bg_blue fw_500 chatbutton'
                onClick={handleInputSubmit}>전송</div>
        </div>
    );
};

export default ChatSubmit;