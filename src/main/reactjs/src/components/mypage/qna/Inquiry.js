import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Inquiry = () => {
    const nav = useNavigate(); 
    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의</Link>
            </div>
            <div className='fs_25 fw_700'>나의 문의내역</div>

            <div className='mt_45 fw_500'>아이디 님, <br/>무엇을 도와드릴까요?</div>

            <button className='btn btn-danger'
            onClick={() => nav('form')}>1:1 문의하기</button>
        </div>
    );
};

export default Inquiry;