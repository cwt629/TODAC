import React from 'react';
import { useNavigate } from 'react-router-dom';

const CounselorCardLast = () => {
    const nav = useNavigate();

    return (
        <div className='counselorcard counselor-last-card'>
            <div className='fw_800 fs_22'>나만의 상담사 만들기!</div>
            <div className='mt_25'>
                여러분이 원하는 대로<br />
                상담사를 직접 커스텀해보세요!
            </div>
            <div className='mt_25'>
                <button type='button' className='counselinnerbtn btn-jittery'
                    onClick={() => nav("custom")}>GO!</button>
            </div>
        </div>
    );
};

export default CounselorCardLast;