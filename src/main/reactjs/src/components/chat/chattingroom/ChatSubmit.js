import { SendRounded } from '@mui/icons-material';
import React from 'react';

const ChatSubmit = ({ input, maxlength, handleInputSubmit, handleInputChange }) => {

    return (
        <div className='chatsubmit mt_10'>
            <textarea className='userinput' value={input}
                placeholder='내용을 입력하세요.' maxLength={maxlength}
                onInput={(e) => handleInputChange(e.target.value)}
            ></textarea>
            <div className='submit-innerdiv'>
                <button type='button' className='lightblue short pressable'
                    onClick={handleInputSubmit}>
                    <SendRounded />
                </button>
                <div className='fs_12 chatlen'>{input.length} / {maxlength}</div>
            </div>
        </div>
    );
};

export default ChatSubmit;