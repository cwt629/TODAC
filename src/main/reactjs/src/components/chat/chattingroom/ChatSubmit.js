import React from 'react';

const ChatSubmit = ({ input, maxlength, handleInputSubmit, handleInputChange }) => {

    return (
        <div className='chatsubmit mt_10'>
            <textarea className='userinput' value={input}
                placeholder='내용을 입력하세요.' maxLength={maxlength}
                onInput={(e) => handleInputChange(e.target.value)}
            ></textarea>
            <div className='submit-innerdiv'>
                {/* <div className='bor_blue1 bg_blue fw_500 chatbutton'
                    onClick={handleInputSubmit}>전송</div> */}
                <button type='button' className='lightblue short'
                    onClick={handleInputSubmit}>전송</button>
                <div className='fs_12 chatlen'>{input.length} / {maxlength}</div>
            </div>
        </div>
    );
};

export default ChatSubmit;