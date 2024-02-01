import { Logout } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const nav = useNavigate();

    return (
        <div className='header'>
            <div style={{ textAlign: 'center' }}>
                <b style={{ cursor: 'pointer' }} className='fs_28'
                    onClick={() => nav('/user')}>TODAC</b>
            </div>
            {/* TODO: 뒤로가기 */}

            <span style={{ float: 'right', paddingRight: '10px' }}>토닥 님 <Logout style={{ cursor: 'pointer' }} onClick={() => {
                nav("/login");
            }} /> </span>
        </div>
    );
};

export default Header;