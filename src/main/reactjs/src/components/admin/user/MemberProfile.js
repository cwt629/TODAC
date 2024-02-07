import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../AdminStyle.css';

const MemberProfile = () => {
    const nav = useNavigate();
    const [member, setMember] = useState([]);
    const storedId = sessionStorage.getItem("id");
    const storedToken = sessionStorage.getItem("token");

    const getMember = () => {
        const url = "/member/list?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setMember(res.data);
            })
    }

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedId = sessionStorage.getItem("id");
        getMember();
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보</Link>
            </div>
            <div className='fs_25 fw_700'>회원정보</div>

            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '30vh', height: '30vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>
            <button className='homebox bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberPost')}> &emsp;{'>'} &emsp;{member.nickname} 님의 게시글</button>
            <br />
            <button className='homebox bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberComment')}> &emsp;{'>'} &emsp;{member.nickname} 님의 댓글</button>
            <br />
            <button className='homebox bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberPayment')}> &emsp;{'>'} &emsp;{member.nickname} 님의 결제 내역</button>
            <br />
            <button className='homebox bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberPoint')}> &emsp;{'>'} &emsp;{member.nickname} 님의 포인트 사용</button>
            <br />
            <button className='homebox bg_blue bor_blue1 fs_16 fw_600'
                onClick={() => nav('MemberChatSearch')}> &emsp;{'>'} &emsp;{member.nickname} 님의 채팅 기록</button>
        </div>
    );
};

export default MemberProfile;