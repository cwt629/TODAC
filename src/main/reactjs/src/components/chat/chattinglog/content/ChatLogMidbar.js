import React from 'react';

const ChatLogMidbar = ({ counselorname }) => {
    return (
        <div className='fs_18 fw_600 mt_10 chatmid'>
            <div>
                <span className='fs_19 col_red'>
                    {counselorname ? counselorname : '어느'}
                </span> 상담사와의 상담일지
            </div>
        </div>
    );
};

export default ChatLogMidbar;