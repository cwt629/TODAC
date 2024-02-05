import React from 'react';
import { Link } from 'react-router-dom';

const InquiryResponse = () => {
    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/InquiryHistory" className='col_blue2'>1:1 문의내역 {'>'}</Link>
                <Link to="/admin/InquiryHistory/InquiryResponse" className='col_blue2'>1:1 문의답변 </Link>
            </div>
            <div className='fs_25 fw_700'>1:1 문의답변</div>
        </div>
    );
};

export default InquiryResponse;