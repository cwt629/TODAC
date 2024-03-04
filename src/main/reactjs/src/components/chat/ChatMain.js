import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PageHeader from '../PageHeader';
import CounselorOptions from './counselor/CounselorOptions';
import './counselor/CounselorStyle.css';
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
        nav("loglist");
    }

    const handleCounselClick = (data) => {
        ReactSwal.fire({
            icon: 'info',
            html: (<div>
                <span className='col_blue2 fs_20 fw_600'>{data.name}</span> 상담사와<br />상담을 시작하시겠습니까?
            </div>),
            confirmButtonText: '예',
            confirmButtonColor: '#5279FD',
            showCancelButton: true,
            cancelButtonText: '아니오'
        }).then(res => {
            if (res.isConfirmed) {
                nav('counsel?counselorcode=' + data.counselorcode)
            }
        })
    }

    const handleCounselorDelete = async (data) => {
        const userConfirm = await ReactSwal.fire({
            icon: 'warning',
            title: '정말로 삭제하시겠어요?',
            html: <div>삭제된 상담사는 복구할 수 없습니다.<br />정말로 <span className='col_red fs_20 fw_600'>{data.name}</span> 상담사를 삭제할까요?</div>,
            confirmButtonText: '예',
            confirmButtonColor: '#ff7170',
            showCancelButton: true,
            cancelButtonText: '아니오'
        });
        if (userConfirm.isConfirmed) {
            try {
                await axios.get("/counselor/delete?counselorcode=" + data.counselorcode);
                await ReactSwal.fire({
                    icon: 'success',
                    title: '삭제 완료!',
                    html: '성공적으로 삭제되었습니다.',
                    confirmButtonText: '확인',
                    confirmButtonColor: '#5279FD'
                });
                window.location.reload(); // 삭제 후 새로고침
            } catch (error) {
                ReactSwal.fire({
                    icon: 'error',
                    title: '에러 발생!',
                    html: '다음 에러가 발생하였습니다: ' + error,
                    confirmButtonText: '확인',
                    confirmButtonColor: '#5279FD'
                })
            }
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("usercode"))
            axios.get('/counselor/mylist?usercode=' + sessionStorage.getItem("usercode"))
                .then((res) => {
                    setCounselorList(res.data);
                })
    }, [])

    return (
        <div className='counselormain'>
            <LogNavigationButton handleClick={handleLogNavClick} />
            <div className='mx_30'>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>
            <CounselorOptions info={counselorList} handleCounselClick={handleCounselClick}
                handleCounselorDelete={handleCounselorDelete} />
        </div>
    );
};

export default ChatMain;