import React from 'react';
import { useNavigate } from 'react-router-dom';

const InquiryHistorydataItem = (props) => {
    const { data } = props;
    console.log("여기니?"+data);
    const nav = useNavigate();

    // answer 값에 따라 완료 여부 결정
    const completionStatus = data.answer ? `답변 완료 (${data.answereddate})` : "미답변";
    
    // answer 값에 따라 클래스 결정
    const statusClass = data.answer ? "col_blue2" : "col_red";

    // const handleClick = () => {
    //     nav(`InquiryResponse/${data.inquirycode}`);
    // };

    // answer 값이 있을 때와 없을 때 각각 다른 경로로 이동하는 함수
    const handleClick = () => {
        if (data.answer) {
            // answer 값이 있을 때 다른 경로로 이동
            nav(`InquiryHistoryDetail/${data.inquirycode}`);
        } else {
            // answer 값이 없을 때 다른 경로로 이동
            nav(`InquiryResponse/${data.inquirycode}`);
        }
    };

    return (
        <div className='bg_gray bor_gray1 px-3 py-2' style={{ cursor: "pointer" }} onClick={handleClick}>
            <div>제목 : <span className='fw_600'>{data.title}</span> | 작성자 : <span className='fw_600'>{data.memberNickname}</span></div>
            <div className='fs_14'>{data.registereddate} | <span className={`fw_500 ${statusClass}`}>{completionStatus}</span></div>
        </div>
    );
};

export default InquiryHistorydataItem;