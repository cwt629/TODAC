import { ExitToAppRounded } from '@mui/icons-material';
import React from 'react';

const ChatRoomMidBar = ({ counselorname, handleFinishChat }) => {
    return (
        <div className='fs_18 fw_600 mt_10 chatmid'>
            <div className='chatmid-title'>
                <span className='fs_19 col_blue2'>{counselorname ? counselorname : '어느'}</span> 상담사와 마음 공유중...
            </div>
            <button type='button' className='deepblue'
                onClick={handleFinishChat}>
                종료 <ExitToAppRounded />
            </button>
        </div>
    );
};

export default ChatRoomMidBar;