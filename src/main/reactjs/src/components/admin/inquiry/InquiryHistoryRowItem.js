import React from 'react';
import { useNavigate } from 'react-router-dom';

const InquiryHistoryRowItem = (props) => {
    const { row } = props;
    const nav = useNavigate();

    // answer 값에 따라 완료 여부 결정
    const completionStatus = row.answer ? `답변 완료 (${row.answereddate})` : "미답변";
    
    // answer 값에 따라 클래스 결정
    const statusClass = row.answer ? "col_blue2" : "col_red";

    // const handleClick = () => {
    //     nav(`InquiryResponse/${row.inquirycode}`);
    // };

    // answer 값이 있을 때와 없을 때 각각 다른 경로로 이동하는 함수
    const handleClick = () => {
        if (row.answer) {
            // answer 값이 있을 때 다른 경로로 이동
            nav(`InquiryHistoryDetail/${row.inquirycode}`);
        } else {
            // answer 값이 없을 때 다른 경로로 이동
            nav(`InquiryResponse/${row.inquirycode}`);
        }
    };

    return (
        <div className='bg_gray bor_gray1 px-3 py-2' style={{ cursor: "pointer" }} onClick={handleClick}>
            <div>제목 : <span className='fw_600'>{row.title}</span></div>
            <div className='fs_14'>{row.registereddate} | <span className={`fw_500 ${statusClass}`}>{completionStatus}</span></div>
        </div>
    );
};

export default InquiryHistoryRowItem;