import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MemberManage = () => {
    const nav = useNavigate();

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원관리</Link>
            </div>
            <div className='fs_25 fw_700'>회원 관리</div>

            <button className='btn btn-success'
                onClick={() => nav('MemberProfile')}>회원 정보</button>
        </div>

    );
};

export default MemberManage;