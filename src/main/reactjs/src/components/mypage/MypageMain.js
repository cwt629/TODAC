import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './QnaStyle.css';
import axios from "axios";
import "./MyPageStyle.css";
import Swal from "sweetalert2";

const MypageMain = () => {
    const [member, setmember] = useState([]);
    const nav = useNavigate();

    const storedId = sessionStorage.getItem("id");
    const loginType = sessionStorage.getItem("loginType");
    const usercode = sessionStorage.getItem("usercode");

    useEffect(() => {
        getmember();
        console.log("storedId:", storedId, ", usercode:", usercode);
    }, []);

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setmember(res.data);
                //console.log(res.data);
            })
    }

    const handleLogout = () => {
        let accessToken = "Bearer " + sessionStorage.getItem("accessToken");
        //console.log(accessToken);

        if (loginType === "kakao") {
            axios.post(
                "/logout/logoutCallBack", {}
            ).then(res => {
                sessionStorage.clear();
                window.location.href = res.data.url;
            });
        }

        else {
            //세션에서 토큰 제거
            sessionStorage.clear();
            //로그인 페이지로 이동
            nav('/login');
        }

    };

    const onPersonDelete = () => {
        // SweetAlert를 사용하여 삭제 여부 확인
        Swal.fire({
            title: '회원 탈퇴',
            text: '정말로 탈퇴하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF7170',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                // 확인 버튼이 눌렸을 때만 삭제 요청을 보냄
                const url = '/member/delete?usercode=' + usercode;
                axios.delete(url)
                    .then(() => {
                        // 삭제 후 다시 게시글 목록을 불러옴
                        Swal.fire({
                            title: '탈퇴 완료',
                            text: '정상적으로 탈퇴되었습니다..',
                            icon: 'success',
                            confirmButtonColor: '#FF7170',
                        });
                        //회원 삭제 후 이전 페이지로 이동
                        //세션에서 토큰 제거
                        sessionStorage.clear();
                        //로그인 페이지로 이동
                        nav("/login");
                    })
                    .catch((error) => {
                        console.error('삭제 중 오류 발생:', error);
                    });
            }
        });
    };
    const insertusertobadge=()=>{
        axios.post("/badgeinsert?usercode="+usercode)
    }

    const updatebadge=()=>{
        axios("/badgeupdate?usercode="+usercode)
    }
    return (

        <div className="mypagemain">
            <div className='mypageheader'>
                <div className='mt-1 fs_14 col_blue2'>
                    <Link to="/user">마이 홈 </Link>
                </div>
                <div className='fs_24 fw_700'>
                    내 정보
                </div>
            </div>
            <div className="profile">
                <img className="profile" alt='' src={member.photo} />
                <div className='mt_10 fs_20 fw_700'>{member.nickname}</div>
            </div>

            <div>
                <button onClick={() => nav("badge")}>업적</button>
                <select style={{width: "300px"}}>
                    <option value="니가가라하와이">아메리카노</option>
                </select>
                <button onClick={insertusertobadge}>업적시작</button>
                <button onClick={updatebadge}>업적업데이트</button>

            </div>

            <div className="iconmenu mt-5">
                <div onClick={() => nav('point')} className="col">
                    <img alt="" src={require("../../image/mypageIcon/point.png")} />
                    <h6>포인트 <b style={{ color: "#FF7170" }}>{member.point?.toLocaleString()}</b></h6>
                </div>
                <div onClick={() => nav('myboard')} className="col">
                    <img alt="" src={require("../../image/mypageIcon/board.png")} />
                    <h6>게시글</h6>
                </div>
                <div onClick={() => nav('donate')} className="col">
                    <img alt="" src={require("../../image/mypageIcon/donation.png")} />
                    <h6>후원하기</h6>
                </div>
            </div>

            <div className="listmenu fw_600 align-items-center mt_45">
                <div onClick={() => nav('update')}>
                    <img alt="" src={require("../../image/mypageIcon/info.png")} />
                    <span className='mx-3'>내 정보 관리</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => nav('inquiry')} className='mt-4'>
                    <img alt="" src={require("../../image/mypageIcon/11.png")} />
                    <span className='mx-3'>1:1 문의</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />

                </div>
                <div onClick={() => nav('faq')} className='mt-4'>
                    <img alt="" src={require("../../image/mypageIcon/faq.png")} />
                    <span className='mx-3'>도움말</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                </div>

                <div onClick={onPersonDelete} className='mt-4' style={{marginTop:"10px"}}>
                    <img alt="" src={require("../../image/mypageIcon/logout.png")} />
                    <span style={{ color: "darkgray" }} className='mx-3'>회원 탈퇴</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                </div>
            </div>


        </div>

    );
};

export default MypageMain;