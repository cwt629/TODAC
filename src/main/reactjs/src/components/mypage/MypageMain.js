import React from 'react';
import {Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const MypageMain = () => {
    const nav = useNavigate();
    return (
        <div>
            <h3>마이페이지임 ㅋ</h3>
            <button className='btn btn-info'
                    onClick={() => nav('payment')}>포인트 충전
            </button>
        </div>
    );
};

export default MypageMain;