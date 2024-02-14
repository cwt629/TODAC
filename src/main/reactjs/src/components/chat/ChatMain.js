import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import CounselorOptions from './counselor/CounselorOptions';
import CounselorProfile from './counselor/CounselorProfile';
import './counselor/CounselorStyle.css';
import CounselStartButton from './counselor/CounselStartButton';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ChatMain = () => {
    const [counselorList, setCounselorList] = useState([]);
    const [selectedCounselor, setSelectedCounselor] = useState(null);

    const nav = useNavigate();

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '' }
    ];

    const PAGE_TITLE = '상담사 선택';

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
            })
    }, [])

    return (
        <div className='counselormain mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <CounselorProfile data={selectedCounselor} />
            <CounselorOptions info={counselorList} handleClick={handleCounselorClick} />
            <CounselStartButton handleClick={handleCounselStart} />
        </div>
    );
};

export default ChatMain;