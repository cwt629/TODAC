import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../AdminStyle.css';
import '../../mypage/QnaStyle.css';
import "../../mypage/MyPageStyle.css";
import Swal from 'sweetalert2';
import PageHeader from '../../PageHeader';

const MemberProfile = () => {
    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '/admin/MemberManage' },
        { name: '회원 정보', url: '' }
    ];
    const PAGE_TITLE = "회원 정보";

    const nav = useNavigate();
    const [member, setMember] = useState([]);
    let [query, setQuery] = useSearchParams();
    const usercode = query.get("usercode");

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const onPersonDelete = () => {
        // SweetAlert를 사용하여 삭제 여부 확인
        Swal.fire({
            title: '회원 삭제',
            text: '정말로 이 회원을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff7170',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼이 눌렸을 때만 삭제 요청을 보냄
                const url = '/member/delete?usercode=' + usercode;
                axios.delete(url)
                    .then(() => {
                        // 삭제 후 다시 게시글 목록을 불러옴
                        getMember(usercode);
                        Swal.fire({
                            title: '삭제 완료',
                            text: '해당 회원이 삭제되었습니다.',
                            icon: 'success',
                            confirmButtonColor: '#5279FD',
                            confirmButtonText: '확인'
                        });
                        //회원 삭제 후 이전 페이지로 이동
                        nav(-1);
                    })
                    .catch((error) => {
                        console.error('삭제 중 오류 발생:', error);
                    });
            }
        });
    };

    useEffect(() => {
        getMember();
    }, [usercode]);

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='fs_25 fw_700 mt_25' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt='' src={member.photo} style={{ width: '18vh', height: '18vh', borderRadius: '50%' }} />
                    <span className='fs_28 fw_700 mt_25'>{member.nickname}님</span>
                </div>
            </div>
            <div className="listmenu fw_600 align-items-center mt_45">
                <div onClick={() => nav('MemberPost?usercode=' + member.usercode)}>
                    <img alt="" src={require("../../../image/adminIcon/Write.png")} />
                    <span className='mx-3 fs_17'>{member.nickname} 님의 게시글</span>
                    <img alt="" src={require("../../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => nav('MemberComment?usercode=' + member.usercode)} className='mt-4'>
                    <img alt="" src={require("../../../image/adminIcon/Write.png")} />
                    <span className='mx-3 fs_17'>{member.nickname} 님의 댓글</span>
                    <img alt="" src={require("../../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => nav('MemberPayment?usercode=' + member.usercode)} className='mt-4'>
                    <img alt="" src={require("../../../image/adminIcon/CreditCard1.png")} />
                    <span className='mx-3 fs_17'>{member.nickname} 님의 결제 내역</span>
                    <img alt="" src={require("../../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => nav('MemberPoint?usercode=' + member.usercode)} className='mt-4'>
                    <img alt="" src={require("../../../image/adminIcon/point.png")} />
                    <span className='mx-3 fs_17'>{member.nickname} 님의 TP 사용 내역</span>
                    <img alt="" src={require("../../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => nav('MemberChatSearch?usercode=' + member.usercode)} className='mt-4'>
                    <img alt="" src={require("../../../image/adminIcon/chat.png")} />
                    <span className='mx-3 fs_17'>{member.nickname} 님의 채팅 기록</span>
                    <img alt="" src={require("../../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => onPersonDelete(usercode)} className='mt-4' style={{ marginTop: "10px" }}>
                    <img alt="" src={require("../../../image/adminIcon/delete.png")} />
                    <span style={{ color: "red" }} className='mx-3'>회원 삭제</span>
                    <img alt="" src={require("../../../image/mypageIcon/pointer.png")} />
                </div>

            </div>
        </div>
    );
};

export default MemberProfile;