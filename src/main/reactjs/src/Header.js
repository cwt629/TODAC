import { Logout } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const nav = useNavigate();

    return (
        <div className='header'>
            <h2 style={{textAlign: 'center', cursor: 'pointer'}}
            onClick={() => nav('/user')}>TODAC</h2>
            {/* TODO: 뒤로가기 */}

            <span style={{float: 'right', paddingRight: '10px'}}>토닥 님 <Logout style={{cursor: 'pointer'}} onClick={() => {
                nav("/login");
            }}/> </span>
        </div>
    );
};

export default Header;