import React from 'react';
import { useNavigate } from 'react-router-dom';

const Pointcheck = () => {
    const nav = useNavigate();
    return (
        <div>
            대충 포인트 내역
            <br></br>
            <button className='btn btn-info'
                    onClick={() => nav('Checkout')}>충전하기</button>
        </div>
    );
};

export default Pointcheck;