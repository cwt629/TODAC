import React from 'react';

const CounselorCard = ({ idx, info, handleClick }) => {
    return (
        <div className='counselorcard bg_red bor_red br_5'
            onClick={() => handleClick(idx)}>
            <span className='fs_14 fw_500'>{info.name} 상담사</span><br />
            <span className='fs_12 fw_300'>{info.briefintro}</span>
        </div>
    );
};

export default CounselorCard;