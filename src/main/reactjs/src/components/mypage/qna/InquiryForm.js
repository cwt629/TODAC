import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const InquiryForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navi = useNavigate();

    //문의하기 버튼
    const addQnaEvent = () => {
        axios.post("/inquiry/form", { title, content }).then((res) => { 
            //추가 성공 후 목록으로 이동
            navi("/inquiry");
        });
    };
    return (
        <div className='mx_30 inquiry_form'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의 {'>'} </Link>
                <Link to="/user/inquiry/form">1:1 문의하기</Link>
            </div>
            <div className='fs_25 fw_700'>1:1 문의하기</div>

            <div className='mt_45 fw_500'>아이디 님, <br/>무엇을 도와드릴까요?</div>

            <div className='mt_45'>
                <div className='fs_18 fw_700'>제목</div>
                <input type='text' className='form-control mt_10' />
            </div>

            <div className='form-group mt_25'>
                <div className='fs_18 fw_700'>내용</div>
                <textarea type='text' className='form-control mt_10' style={{ height: "200px" }} />
            </div>

            <div className='mt_10 fs_14 text-end fw_500'>
                문의 내용은&nbsp;
                <Link to="/user" className='col_blue2'>'마이 홈 {'>'} </Link>
                <Link to="/user/inquiry" className='col_blue2'>1:1 문의'</Link>&nbsp;에서 확인 가능합니다.
            </div>

            <div className='d-flex mt_45 inquiry_btn'>
                <div className='me-auto'>
                    <button type='button py-3'>
                        문의 등록취소
                    </button>
                </div>
                <div className='ml-auto'>    
                    <button type='button py-3'>
                        문의 등록하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InquiryForm;