import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InquiryRowItem from './InquiryRowItem';
import { Pagination } from '@mui/material';
import PageHeader from '../../PageHeader';

const Inquiry = () => {
    const [list, setList] = useState([]);
    const [memberinfo, setMemberinfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태 추가
    const itemsPerPage = 5; // 페이지당 항목 수
    const pagesToShow = 5; // 표시할 페이지 번호의 최대 개수

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

    const groupStartPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const groupEndPage = Math.min(totalPages, groupStartPage + pagesToShow - 1);

    const CURRENT_ROUTES = [
        { name: "마이 홈", url: "/user" },
        { name: "나의 문의내역", url: "/user/inquiry" },
    ];
    
    const PAGE_TITLE = "나의 문의내역";

    return (
        <div className='mx_30'>
            <div>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>

            <div className='mt_25 fw_500'><span className='fw_900 col_blue2'>{memberinfo.nickname}</span> 님, <br/>무엇을 도와드릴까요?</div>

            <div className='d-flex mt_25 inquiry_list align-items-center'>
                <div className='me-auto fs_18 fw_700'>
                    1:1 문의내역
                </div>
                <div className='ml-auto'>
                    <button  onClick={() => nav('form')} className='btn_m1'>
                        {/* <img alt='' src={require('../../../image/ico_inquiry3.png')} className='img-fluid'/> */}
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
                {/* <div className='justify-content-center d-flex mt-3 qnaPage_btn'>
                    <Pagination
                        page={currentPage}
                        count={totalPages}
                        onChange={handlePageChange}
                    />
                </div> */}
                <div className='justify-content-center d-flex mt-3 qnaPage_btn'>
                    <Pagination
                        page={currentPage}
                        count={totalPages}
                        onChange={handlePageChange}
                        shape="rounded" // 모서리 둥글게
                        variant="outlined" // 테두리 스타일
                        color="primary" // 색상
                        hidePrevButton
                        hideNextButton
                        hideFirstButton
                        hideLastButton
                    />
                </div>
            </div>
        </div>
    );
};

export default Inquiry;