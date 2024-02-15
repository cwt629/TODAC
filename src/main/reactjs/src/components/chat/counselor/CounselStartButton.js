import React from 'react';

const CounselStartButton = ({ handleClick }) => {
    return (
        <div className='counselbtndiv mt_45'>
            <button className='counselbtn bor_blue1 bg_blue br_5'
                onClick={handleClick}>
                TODAC 상담받기
            </button>
        </div>
    );
};

export default CounselStartButton;