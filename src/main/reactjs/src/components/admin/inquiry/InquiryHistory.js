import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const InquiryHistory = () => {
    const nav = useNavigate();

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/InquiryHistory" className='col_blue2'>1:1 문의내역</Link>
            </div>
            <div className='fs_25 fw_700'>1:1 문의내역</div>
            <button className='btn btn-danger'
                onClick={() => nav('InquiryResponse')}>1:1문의 답변</button>
        </div>
    );
};

export default InquiryHistory;