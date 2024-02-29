import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminStyle.css";
import '../mypage/QnaStyle.css';
import "../mypage/MyPageStyle.css";
import PageHeader from "../PageHeader";

const AdminMain = () => {
    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '' }
    ];
    const PAGE_TITLE = "관리자 메뉴";

    const handleLogout = () => {
        sessionStorage.clear();
        nav("/login"); // 로그아웃 후 로그인 페이지로 이동
    };
    const nav = useNavigate();

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        const storedId = sessionStorage.getItem("id");
        const usercode = sessionStorage.getItem("usercode");
    }, []);

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />

            <div className="listmenu fw_600 align-items-center mt_80">
                <div onClick={() => nav('MemberManage')}>
                    <img alt="" src={require("../../image/adminIcon/member.png")} />
                    <span className='mx-3 fs_18'>회원 관리</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={() => nav('InquiryHistory')} className='mt_60'>
                    <img alt="" src={require("../../image/adminIcon/question.png")} />
                    <span className='mx-3 fs_18'>문의게시판 관리</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                </div>
                <div onClick={handleLogout} className='mt_60'>
                    <img alt="" src={require("../../image/mypageIcon/logout.png")} />
                    <span style={{ color: "darkgray" }} className='mx-3 fs_18'>로그아웃</span>
                    <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                </div>
            </div>
        </div>
    );
};

export default AdminMain;
