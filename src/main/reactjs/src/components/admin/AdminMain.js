import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminMain = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
    };

    return (
        <div>
            <button type='button' className='btn btn-danger' onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
};

export default AdminMain;
