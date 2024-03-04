import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import PageHeader from '../../PageHeader';

const InquiryForm = () => {
    const [title, setTitle] = useState("");
    const [inquiry, setInquiry] = useState("");
    const usercode = sessionStorage.getItem("usercode");

    const [memberinfo, setMemberinfo] = useState([]);
    const id = sessionStorage.getItem("id");

    const nav = useNavigate();

    //문의등록 버튼
    const addQnaEvent = () => {
        axios.post("/user/inquiry/add?usercode=" + usercode, { title, inquiry }).then((res) => {
            //추가 성공 후 목록으로 이동
            nav("/user/inquiry");
        });
    };

    const getmemberinfo = () => {
        axios.post("/member/info?userid=" + id).then((res) => {
            console.log(res.data);
            setMemberinfo(res.data);
        })
    }

    useEffect(() => {
        getmemberinfo();
    }, []);

    const CURRENT_ROUTES = [
        { name: "마이 홈", url: "/user" },
        { name: "나의 문의내역", url: "/user/inquiry" },
        { name: "1:1 문의하기", url: "" },
    ];

    const PAGE_TITLE = "1:1 문의하기";
    return (
        <div className='mx_30 inquiry_form'>
            <div>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>

            <div className='mt_25 fw_500'><span className='fw_900 col_blue2'>{memberinfo.nickname}</span> 님, <br />문의를 말씀해 주세요!</div>

            <div className='mt_25'>
                <div className='fs_18 fw_700'>제목</div>
                <input type='text' className='input_text' style={{ width: "100%" }} onChange={(e) => {
                    setTitle(e.target.value)
                }} placeholder='제목을 입력해주세요.' />
            </div>

            <div className='form-group mt_25'>
                <div className='fs_18 fw_700'>상세 문의</div>
                <textarea type='text' className='input_text' style={{ height: "200px", width: "100%" }} onChange={(e) => setInquiry(e.target.value)} placeholder='문의하실 내용을 입력해주세요.' />
            </div>

            <div className='mt_10 fs_14 text-end fw_500'>
                문의 내용은&nbsp;
                <Link to="/user" className='col_blue2'>'마이 홈 {'>'} </Link>
                <Link to="/user/inquiry" className='col_blue2'>1:1 문의'</Link>&nbsp;에서 확인 가능합니다.
            </div>

            <div className='d-flex mt_45 justify-content-evenly'>
                <button className='lightblue long' type='button' onClick={() => nav('../')}>
                    문의  목록으로
                </button>
                <button className='deepblue long' type='button' onClick={addQnaEvent}>
                    문의 등록하기
                </button>
            </div>
        </div>
    );
};

export default InquiryForm;