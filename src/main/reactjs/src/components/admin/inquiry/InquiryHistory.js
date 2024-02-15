import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InquiryHistoryRowItem from './InquiryHistoryRowItem';
import { Pagination } from '@mui/material';

const InquiryHistory = () => {
    const [list, setList] = useState([]);
    const [showUnansweredOnly, setShowUnansweredOnly] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태 추가
    const nav = useNavigate(); 
    const itemsPerPage = 5; // 페이지당 항목 수

    const qnaList = () => {
        axios.get(`/inquiry/list`).then((res)=>{
            console.log(res.data);
            setList(res.data); // 전체 데이터를 받아옴
            setTotalPages(Math.ceil(res.data.length / itemsPerPage)); // 전체 페이지 수 계산
        });
    };

    useEffect(()=>{
        qnaList();
    }, []); // 페이지가 변하지 않으므로 빈 배열 전달

    const handleShowUnansweredOnlyChange = (event) => {
        setShowUnansweredOnly(event.target.checked);
        setCurrentPage(1); // 미답변만 보기 체크 시 페이지를 1페이지로 초기화
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const filteredList = list.filter(data => !showUnansweredOnly || !data.answer); // 미답변 필터링

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/InquiryHistory" className='col_blue2'>문의 관리</Link>
            </div>
            <div className='fs_25 fw_700'>1:1 문의내역</div>

            <div className='mt_45'>
                <div className="mb-2 d-flex justify-content-between align-items-center">
                    <div className='fw_800'>문의 목록</div>
                    <div className='br_5 bor_blue1 bg_blue py-1 px-2'>
                        <input
                            type="checkbox"
                            id="showUnansweredOnly"
                            checked={showUnansweredOnly}
                            onChange={handleShowUnansweredOnlyChange}
                            style={{marginRight:"10px"}}
                        />
                        <label className='fw_600 fs_15' htmlFor="showUnansweredOnly">미답변만 확인</label>
                    </div>
                </div>
                
                {filteredList &&
                    filteredList.slice(startIndex, endIndex).map((data, idx) => (
                        <InquiryHistoryRowItem
                            key={idx}
                            data={data}
                        />
                    ))}
                <div className='justify-content-center d-flex mt-3 qnaPage_btn'>
                    <Pagination
                        page={currentPage}
                        count={Math.ceil(filteredList.length / itemsPerPage)} // 필터링된 데이터로 페이지 수 계산
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default InquiryHistory;