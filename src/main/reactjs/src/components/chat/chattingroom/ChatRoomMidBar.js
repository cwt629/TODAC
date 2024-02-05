import React from 'react';

const ChatRoomMidBar = () => {
    return (
        <div className='fs_18 fw_600 mt_10 chatmid'>
            <div>
                <span className='fs_19 col_red'>어느</span> 상담사와 마음 공유중...
            </div>
            <div className='bor_blue1 bg_blue fw_500 chatbutton' style={{ float: 'right' }}>종료</div>
        </div>
    );
};

export default ChatRoomMidBar;