import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MemberProfile = () => {
    const nav = useNavigate();
    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보</Link>
            </div>
            <div className='fs_25 fw_700'>회원정보</div>

            <button className='btn btn-success'
                onClick={() => nav('MemberPost')}>게시글</button>
            <br /><br />
            <button className='btn btn-danger'
                onClick={() => nav('MemberComment')}>댓글</button>
            <br /><br />
            <button className='btn btn-success'
                onClick={() => nav('MemberPayment')}>결제 내역</button>
            <br /><br />
            <button className='btn btn-info'
                onClick={() => nav('MemberPoint')}>포인트 사용</button>
            <br /><br />
            <button className='btn btn-danger'
                onClick={() => nav('MemberChatSearch')}>채팅</button>
        </div>
    );
};

export default MemberProfile;