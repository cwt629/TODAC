import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminMain = () => {
    const nav = useNavigate();

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈</Link>
                <div className='fs_25 fw_700'>관리자 메뉴</div>
                <br /><br /><br />
                <button className='btn btn-success'
                    onClick={() => nav('MemberManage')}>회원관리</button>
                <br /><br />
                <button className='btn btn-info'
                    onClick={() => nav('InquiryHistory')}>문의게시판 관리</button>
                <br /><br />
                <button className='btn btn-danger'
                    onClick={() => nav('LoginMain')}>로그아웃</button>
            </div>
        </div>

    );
};

export default AdminMain;