import React from 'react';

const PostNavigationButton = ({ handleClick }) => {
    return (
        <div className='counselbtndiv counsel-lognav'>
            <button type='button' className='white' onClick={handleClick}>
                게시글 쓰기
            </button>
        </div>
    );
};

export default PostNavigationButton;