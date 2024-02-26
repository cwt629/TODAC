import React from 'react';

const ChatListButtons = ({ needToShow, displayedAll, handleExpandDisplay, handleShrinkDisplay }) => {
    return (
        <div className='mt_25' style={{ textAlign: 'center', display: needToShow ? 'block' : 'none' }}>
            <button className='moreView' style={{ color: '#536179' }}
                onClick={displayedAll ? handleShrinkDisplay : handleExpandDisplay} >
                {displayedAll ? '간략히 보기' : '더 보기'}
            </button>
        </div>
    );
};

export default ChatListButtons;