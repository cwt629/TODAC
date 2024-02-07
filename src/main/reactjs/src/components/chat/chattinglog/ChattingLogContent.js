import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ChattingLogContent = () => {
    const nav = useNavigate();

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/loglist" className='col_blue2'>상담기록 {'>'} </Link>
                <Link to="/user/chat/logcontent" className='col_blue2'>상담일지</Link>
            </div>
            <div className='fs_25 fw_700'>나의 상담일지</div>
            <br /><br />
            <div>
                <span className='fs_19 col_red'>어느</span> 상담사와의 상담일지
            </div>
            <div className='chatcontent fs_14 bor_red bg_red mt_10'></div>
            <br /><br />
            <div style={{ textAlign: 'center' }}>
                <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../loglist')}>뒤로가기</button>
                &nbsp;&nbsp;
                <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../diagnosis')}>진단서 발급(500P)</button>
            </div>
        </div>
    );
};
export default ChattingLogContent;