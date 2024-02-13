import React from 'react';
import CounselorCard from './CounselorCard';

const CounselorOptions = ({ info, handleClick }) => {
    return (
        <div className='counseloroptions mt_25'>
            {
                info.map((data, idx) => (
                    <CounselorCard key={idx} idx={idx} info={data} handleClick={handleClick} />
                ))
            }
        </div>
    );
};

export default CounselorOptions;