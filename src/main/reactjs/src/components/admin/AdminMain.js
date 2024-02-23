import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AdminStyle.css';
import { Logout } from '@mui/icons-material';

const AdminMain = () => {

    const handleLogout = () => {
        sessionStorage.clear();
        nav('/login'); // 로그아웃 후 로그인 페이지로 이동
    };
    const nav = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedId = sessionStorage.getItem("id");
        const usercode = sessionStorage.getItem("usercode");
        console.log("Stored t:", storedToken, ", Stored id:", storedId, ",usercode:", usercode);
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈</Link>
                <div className='fs_25 fw_700'>관리자 메뉴</div>
                <br /><br /><br />
                <button className='homebox bg_red bor_red fs_16 fw_600'
                    onClick={() => nav('MemberManage')}>&emsp;{'>'}&emsp;회원관리</button>
                <br /><br />
                <button className='homebox bg_blue bor_blue1 fs_16 fw_600'
                    onClick={() => nav('InquiryHistory')}>&emsp;{'>'}&emsp;문의게시판 관리</button>
                <br /><br /><br /><br />

                <span>
                    <Logout style={{ cursor: 'pointer' }} onClick={handleLogout} />
                    <button
                        style={{ cursor: 'pointer', border: 'none', background: 'none' }}
                        onClick={handleLogout}
                    >
                        로그아웃
                    </button>
                </span>

            </div>
        </div>

    );
};

export default AdminMain;
