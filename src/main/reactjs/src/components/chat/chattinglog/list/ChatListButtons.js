import React from 'react';

const ChatListButtons = ({ needToShow, displayedAll, handleExpandDisplay, handleShrinkDisplay }) => {
    return (
        <div className='mt_25' style={{ textAlign: 'center', display: needToShow ? 'block' : 'none' }}>
            {
                displayedAll ?
                    <button className='deepblue' onClick={handleShrinkDisplay}>간략히 보기</button>
                    :
                    <button className='white' onClick={handleExpandDisplay}>더 보기</button>
            }
        </div>
    );
};

export default ChatListButtons;