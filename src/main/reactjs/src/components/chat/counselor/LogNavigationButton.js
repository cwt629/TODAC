import React from 'react';

const LogNavigationButton = ({ handleClick }) => {
    return (
        <div className='counselbtndiv counsel-lognav'>
            <div className='counselbtn bor_blue1 bg_blue br_5 fw_600'
                onClick={handleClick}>
                나의 상담기록
            </div>
        </div>
    );
};

export default LogNavigationButton;