import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InquiryRowItem from './InquiryRowItem';
import { Pagination } from '@mui/material';

const Inquiry = () => {
    const [list, setList] = useState([]);
    const [memberinfo, setMemberinfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태 추가
    const itemsPerPage = 5; // 페이지당 항목 수

    const user = sessionStorage.getItem("usercode");
    const nickname = sessionStorage.getItem("nickname");
    const id = sessionStorage.getItem("id");

    const nav = useNavigate(); 

    const qnaList = () => {
        axios.post("/user/inquiry?usercode="+user).then((res)=>{
            console.log(res.data.qna);
            // 최신 글을 위로 오게 역순으로 정렬
            const reversedList = res.data.qna.reverse();
            setList(res.data.qna);
            setTotalPages(Math.ceil(reversedList.length / itemsPerPage)); // 전체 페이지 수 계산
        })
    }

    const getmemberinfo = () => {
        axios.post("/member/info?userid="+id).then((res)=>{
            console.log(res.data);
            setMemberinfo(res.data);
        })
    }

    useEffect(()=>{
        qnaList();
        getmemberinfo();
    }, []);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의</Link>
            </div>
            <div className='fs_25 fw_700'>나의 문의내역</div>

            <div className='mt_45 fw_500'><span className='fw_900 col_blue1'>{memberinfo.nickname}</span> 님, <br/>무엇을 도와드릴까요?</div>

            <div className='d-flex mt_45 inquiry_list align-items-center'>
                <div className='me-auto fs_18 fw_700'>
                    1:1 문의내역
                </div>
                <div className='ml-auto'>
                    <button  onClick={() => nav('form')}>
                        <img alt='' src={require('../../../image/ico_inquiry.png')} className='img-fluid'/>
                        <span className='mx-2'>1:1 문의하기</span>
                    </button>
                </div>
            </div>
            
            <div className='mt_10'>
                {list &&
                    list.slice(startIndex, endIndex).map((row, idx) => (
                        <InquiryRowItem
                        key={idx}
                        row={row}
                    />
                ))}
                <div className='justify-content-center d-flex mt-3 qnaPage_btn'>
                    <Pagination
                        page={currentPage}
                        count={totalPages}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Inquiry;