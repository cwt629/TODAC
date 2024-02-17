import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommunityMain = () => {
    const nav = useNavigate();

    return (
        <div>
            <br /><br /><br />
            <button className='btn btn-success'
                onClick={() => nav('board')}>게시판</button>
            <br /><br /><br />
            <button className='btn btn-info'
                onClick={() => nav('donation')}>후원의 전당</button>
            <br /><br /><br />
            <button className='btn btn-secondary'
                onClick={() => nav('game')}>오늘의 미소</button>
        </div>
    );
};

export default CommunityMain;