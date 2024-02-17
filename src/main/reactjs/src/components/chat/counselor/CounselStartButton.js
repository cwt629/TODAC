import React from 'react';

const CounselStartButton = ({ handleClick }) => {
    return (
        <div className='counselbtndiv counsel-start mt_45'>
            <div className='counselbtn bor_blue1 bg_blue br_5 fw_600'
                onClick={handleClick}>
                TODAC 상담받기
            </div>
        </div>
    );
};

export default CounselStartButton;