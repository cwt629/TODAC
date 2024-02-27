import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AdminStyle.css";
import '../mypage/QnaStyle.css';
import "../mypage/MyPageStyle.css";

const AdminMain = () => {
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
            <div className='mt-1 fs_14'>
                <Link to='/admin' className='col_blue2'>
                    관리자 홈
                </Link>
                <div className='fs_24 fw_700'>관리자 메뉴</div>
                <br />
                <br />
                <br />
                <div className="listmenu fw_600 align-items-center mt_45">
                    <div onClick={() => nav('MemberManage')}>
                        <img alt="" src={require("../../image/mypageIcon/info.png")} />
                        <span className='mx-3 fs_18'>회원 관리</span>
                        <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                    </div>
                    <br />
                    <div onClick={() => nav('InquiryHistory')} className='mt-4'>
                        <img alt="" src={require("../../image/mypageIcon/faq.png")} />
                        <span className='mx-3 fs_18'>문의게시판 관리</span>
                        <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                    </div>
                    <br />
                    <div onClick={handleLogout} className='mt-4' style={{ marginTop: "10px" }}>
                        <img alt="" src={require("../../image/mypageIcon/logout.png")} />
                        <span style={{ color: "darkgray" }} className='mx-3 fs_18'>로그아웃</span>
                        <img alt="" src={require("../../image/mypageIcon/pointer.png")} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMain;
