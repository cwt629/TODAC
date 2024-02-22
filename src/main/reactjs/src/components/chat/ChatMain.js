import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import CounselorOptions from './counselor/CounselorOptions';
import CounselorProfile from './counselor/CounselorProfile';
import './counselor/CounselorStyle.css';
import CounselStartButton from './counselor/CounselStartButton';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogNavigationButton from './counselor/LogNavigationButton';

const ChatMain = () => {
    const [counselorList, setCounselorList] = useState([]);
    const [selectedCounselor, setSelectedCounselor] = useState(null);

    const nav = useNavigate();

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '' }
    ];

    const PAGE_TITLE = '상담사 선택';

    // 나의 상담 기록 이동 버튼
    const handleLogNavClick = () => {
        // TODO: '현재 사용자'의 로그 리스트 구현 후, 그 쪽으로 이동해야 함
        nav("loglist");
    }

    const handleCounselorClick = (index) => {
        setSelectedCounselor(counselorList[index]);
    }

    const handleCounselStart = () => {
        if (!selectedCounselor) {
            Swal.fire({
                title: '상담사를 선택해주세요!',
                icon: 'error',
                confirmButtonText: '확인',
                confirmButtonColor: '#FF7170'
            });
            return;
        }

        nav('counsel?counselorcode=' + selectedCounselor.counselorcode);
    }

    useEffect(() => {
        axios.get('/counselor/list')
            .then((res) => {
                setCounselorList(res.data);
                setSelectedCounselor(res.data[0]);
            })
    }, [])

    return (
        <div className='counselormain mx_30'>
            <LogNavigationButton handleClick={handleLogNavClick} />
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            {/* <CounselorProfile data={selectedCounselor} /> */}
            <CounselorOptions info={counselorList} handleClick={handleCounselorClick} />
            {/* <CounselStartButton handleClick={handleCounselStart} /> */}
        </div>
    );
};

export default ChatMain;