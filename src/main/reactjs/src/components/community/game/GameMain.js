import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const GameMain = () => {
    const navi = useNavigate();
    const usercode = sessionStorage.getItem('usercode');

    let urlSet = 'http://localhost:7777?usercode=' + usercode;

    console.log(' ======================= urlSet : ', urlSet);

    return (
        <div className='mx_30'>

            <div className='mt-1 fs_14 col_blue2'>
                <Link to='/user/community'>커뮤니티 {">"} </Link>
                <span>오늘의미소</span>
            </div>

            <div className='fs_25 fw_700'>오늘의 미소</div>

            <div style={{width: '100%', position : 'relative', height: '550px'}}>
            <iframe
                style={{
                      width: '100%'
                    , height : '100%'
                }}
                title="Cocos Creator Game"
                src={urlSet}
            ></iframe>
            </div>

        </div>
    );
};

export default GameMain;