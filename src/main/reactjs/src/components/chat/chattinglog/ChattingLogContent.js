import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../PageHeader';

const ChattingLogContent = () => {
    const nav = useNavigate();

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '상담기록', url: '/user/chat/loglist' },
        { name: '상담일지', url: '' }
    ];

    const PAGE_TITLE = '나의 상담일지';

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
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