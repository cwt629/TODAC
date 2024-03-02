import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InquiryHistoryRowItem from './InquiryHistoryRowItem';
import { Pagination } from '@mui/material';
import PageHeader from '../../PageHeader';

const InquiryHistory = () => {
    const [list, setList] = useState([]);
    const [showUnansweredOnly, setShowUnansweredOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수 상태 추가
    const nav = useNavigate();
    const itemsPerPage = 5; // 페이지당 항목 수
    const pagesToShow = 5; // 표시할 페이지 번호의 최대 개수

    const qnaList = () => {
        axios.get(`/inquiry/list`).then((res) => {
            console.log(res.data);
            const filteredList = res.data.filter(data => !showUnansweredOnly || !data.answer);
            setList(filteredList); // 미답변 필터링 적용한 데이터를 받아옴
            setTotalPages(Math.ceil(filteredList.length / itemsPerPage)); // 전체 페이지 수 계산
        });
    };

    useEffect(() => {
        qnaList();
    }, [showUnansweredOnly]); // showUnansweredOnly가 변경될 때만 useEffect 실행

    const handleShowUnansweredOnlyChange = (event) => {
        setShowUnansweredOnly(event.target.checked);
        setCurrentPage(1); // 미답변만 보기 체크 시 페이지를 1페이지로 초기화
    };

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const groupStartPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const groupEndPage = Math.min(totalPages, groupStartPage + pagesToShow - 1);

    const CURRENT_ROUTES = [
        { name: "관리자 홈", url: "/admin" },
        { name: "1:1 문의내역", url: "/admin/InquiryHistory" },
    ];
    
    const PAGE_TITLE = "1:1 문의내역";

    return (
        <div className='mx_30'>
            <div className="mb-2 d-flex justify-content-between align-items-center">
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                <div className='inquiryhistory_bg'>
                    <input
                        type="checkbox"
                        id="showUnansweredOnly"
                        checked={showUnansweredOnly}
                        onChange={handleShowUnansweredOnlyChange}
                        style={{ marginRight: "10px" }}
                    />
                    <label htmlFor="showUnansweredOnly">미답변만 확인</label>
                </div>
            </div>

            <div className='mt_25'>
                {list &&
                    list.slice(startIndex, endIndex).map((data, idx) => (
                        <InquiryHistoryRowItem
                            key={idx}
                            data={data}
                        />
                    ))}

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

export default InquiryHistory;
