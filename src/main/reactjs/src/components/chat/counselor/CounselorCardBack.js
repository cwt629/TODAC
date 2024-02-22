import React from 'react';

const CounselorCardBack = ({ borcolor, data, handleCounselClick }) => {
    return (
        <div className='counselorcard card-back'
            style={{ backgroundColor: borcolor }}>
            <button type='button'
                onClick={() => handleCounselClick(data)}>TODAC 상담시작</button>
        </div>
    );
};

export default CounselorCardBack;