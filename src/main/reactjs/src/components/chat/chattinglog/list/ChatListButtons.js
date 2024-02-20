import React from 'react';

const ChatListButtons = ({ showMore, handleShowMore }) => {
    return (
        <div className='mt_25' style={{ textAlign: 'center' }}>
            <button onClick={handleShowMore} className='btn bor_blue1 bg_blue' style={{ color: '#536179' }}>
                {showMore ? '간략히 보기' : '더 보기'}
            </button>
        </div>
    );
};

export default ChatListButtons;