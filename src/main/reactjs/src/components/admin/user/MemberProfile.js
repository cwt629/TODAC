import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../AdminStyle.css';
import Swal from 'sweetalert2';
import CommentIcon from '@mui/icons-material/Comment';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

const MemberProfile = () => {
    const nav = useNavigate();
    const [member, setMember] = useState([]);
    let [query, setQuery] = useSearchParams();
    const userid = query.get("userid");

    const getMember = () => {
        const url = "/member/info?userid=" + userid;
        console.log("userid = " + userid);
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const onPersonDelete = () => {
        // SweetAlert를 사용하여 삭제 여부 확인
        Swal.fire({
            title: '회원 추방',
            text: '정말로 이 회원을 추방하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼이 눌렸을 때만 삭제 요청을 보냄
                const url = '/member/delete?userid=' + userid;
                axios.delete(url)
                    .then(res => {
                        // 삭제 후 이전 페이지로 이동
                        nav(-1); // -1을 전달하여 이전 페이지로 이동
                    })
                    .catch(error => {
                        console.error('삭제 중 오류 발생:', error);
                    });
            }
        });
    };


    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedId = sessionStorage.getItem("id");
        getMember();
    }, [userid]);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보</Link>
            </div>
            <div className='fs_25 fw_700'>회원정보
                <button
                    className='bor_blue2 fs_18 fw_700 col_blue2'
                    onClick={() => onPersonDelete(userid)}
                    style={{ float: 'right', borderRadius: '8px', backgroundColor: 'white' }}
                >
                    회원 추방
                </button></div>
            <br /><br />
            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '25vh', height: '25vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>
            <button className='commonButton bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberPost')}><CommentIcon color='deepblue' />&nbsp;&nbsp;{member.nickname} 님의 게시글 &nbsp;{'>'}</button>
            <br />
            <button className='commonButton bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberComment')}> <CommentIcon />&nbsp;&nbsp;{member.nickname} 님의 댓글 &nbsp; {'>'} </button>
            <br />
            <button className='commonButton bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberPayment')}> <PaymentOutlinedIcon />&nbsp;&nbsp;{member.nickname} 님의 결제 내역&nbsp; {'>'}</button>
            <br />
            <button className='commonButton bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberPoint')}> <CardGiftcardOutlinedIcon /> &nbsp;&nbsp;{member.nickname} 님의 포인트 사용 &nbsp;{'>'}</button>
            <br />
            <button className='commonButton bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberChatSearch')}><ForumOutlinedIcon />&nbsp;&nbsp;{member.nickname} 님의 채팅 기록&nbsp; {'>'}</button>
        </div>
    );
};

export default MemberProfile;