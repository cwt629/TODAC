import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './DocumentStyle.css';

const ChatDiagnosis = () => {
    const [summaryList, setSummaryList] = useState([]);
    const nav = useNavigate();
    const [query, setQuery] = useSearchParams();
    const roomcode = query.get("roomcode");

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/counsel" className='col_blue2'>상담 받기 {'>'} </Link>
                <Link to="/user/chat/summary" className='col_blue2'>요약 {'>'}</Link>
                <Link to="/user/chat/diagnosis" className='col_blue2'>진단서</Link>
            </div>
            <div className='fs_25 fw_700'>나의 진단서</div>
            <br /><br />
            <div className='fs_20 fw_700'>내 고민 요약</div>
            <div className='diagnosisSummaryContent fs_14 bor_red bg_red mt_10'>고민 내용</div>
            <br />
            <div className='fs_20 fw_700'>상담사의 답변 요약</div>
            <div className='diagnosisSummaryAnswerContent fs_14 bor_blue1 bg_blue mt_10'>답변 내용</div>
            <br />
            <div className='fs_20 fw_700'>심리 분석</div>
            <div className='diagnosisPsychology fs_14 bor_blue1 bg_blue mt_10'>심리 분석 내용</div>
            <br />
            <div className='fs_20 fw_700'>고민이 계속될 땐, 이렇게 해보세요 🤗</div>
            <div className='diagnosisActing fs_14 bor_blue1 bg_blue mt_10'>한강 가서 사람들 지켜보기, 클라이밍, 등산</div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../../')}>마이 홈 이동하기</button>
            </div>
        </div>
    );
};

export default ChatDiagnosis;