import React from 'react';
import { useNavigate } from 'react-router-dom';

const Inquiry = () => {
    const nav = useNavigate(); 
    return (
        <div>
            <button className='btn btn-danger'
            onClick={() => nav('form')}>1:1 문의하기</button>
        </div>
    );
};

export default Inquiry;