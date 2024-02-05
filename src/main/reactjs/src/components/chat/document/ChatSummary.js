import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import diagnosis from '../../../image/diagnosis.png';

const ChatSummary = () => {
    const nav = useNavigate();

    const handleInfoClick = () => {
        // 직접 스타일 객체를 정의하여 전달
        const imageStyle = {
            border: '1px solid red'
        };

        // sweetalert2 팝업 띄우기
        Swal.fire({
            title: '진단서 예시 및 간단 설명',
            // imageUrl: diagnosis,
            // imageWidth: 300,
            // imageHeight: 651,
            html: '<div style="border: 1px solid red; border-radius: 10px; overflow: hidden;"><img src="' + diagnosis + '" alt="이미지" style="width: 80%; height: auto;"></div>',
            icon: 'info',
            confirmButtonText: '닫기',
        });
    };

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/counsel" className='col_blue2'>상담 받기 {'>'} </Link>
                <Link to="/user/chat/summary" className='col_blue2'>요약</Link>
            </div>
            <div className='fs_25 fw_700'>오늘의 상담 요약</div>
            <br /><br />
            <div className='fs_20 fw_700'>내 고민 요약</div>
            <div style={{ backgroundColor: 'yellow', color: 'indigo', padding: '5px', borderRadius: '10px' }}>고민 내용</div>
            <br />
            <div className='fs_20 fw_700'>상담사의 답변 요약</div>
            <div style={{ backgroundColor: 'yellow', color: 'indigo', padding: '5px', borderRadius: '10px' }}>답변 내용</div>
            <br /><br />
            <div>
                <button className='btn btn-success' onClick={() => nav('../../')}>마이 홈 이동하기</button>
                &nbsp;&nbsp;
                <button className='btn btn-success' onClick={() => nav('../diagnosis')}>진단서 발급(500P)</button>
                &nbsp;&nbsp;
                <span role="img" aria-label="info-icon" className="info-icon" style={{ cursor: 'pointer' }} onClick={handleInfoClick}>ℹ️</span>
            </div>
        </div>
    );
};

export default ChatSummary;
