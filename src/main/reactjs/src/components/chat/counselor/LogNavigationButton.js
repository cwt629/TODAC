import React from "react";

const LogNavigationButton = ({ handleClick }) => {
    return (
        <div className='counselbtndiv counsel-lognav'>
            <button type='button' className='white' onClick={handleClick}>
                나의 상담기록
            </button>
        </div>
    );
};

export default LogNavigationButton;
