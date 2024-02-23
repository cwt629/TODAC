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
import withReactContent from 'sweetalert2-react-content';

const ReactSwal = withReactContent(Swal);

const ChatMain = () => {
    const [counselorList, setCounselorList] = useState([]);

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

    const handleCounselClick = (data) => {
        ReactSwal.fire({
            icon: 'info',
            html: (<div>
                <span className='col_red fs_20 fw_600'>{data.name}</span> 상담사와<br />상담을 시작하시겠습니까?
            </div>),
            confirmButtonText: '네',
            confirmButtonColor: '#FF7170',
            showCancelButton: true,
            cancelButtonText: '아니오',
            cancelButtonColor: '#9396A6'
        }).then(res => {
            if (res.isConfirmed) {
                nav('counsel?counselorcode=' + data.counselorcode)
            }
        })
    }

    useEffect(() => {
        axios.get('/counselor/list')
            .then((res) => {
                setCounselorList(res.data);
            })
    }, [])

    return (
        <div className='counselormain mx_30'>
            <LogNavigationButton handleClick={handleLogNavClick} />
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            {/* <CounselorProfile data={selectedCounselor} /> */}
            <CounselorOptions info={counselorList} handleCounselClick={handleCounselClick} />
            {/* <CounselStartButton handleClick={handleCounselStart} /> */}
        </div>
    );
};

export default ChatMain;