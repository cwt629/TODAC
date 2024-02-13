import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import InquiryHistoryRowItem from './InquiryHistoryRowItem';

const InquiryHistory = () => {
    const [list, setList] = useState([]);
    const [showUnansweredOnly, setShowUnansweredOnly] = useState(false); // 미답변만 보기 체크 여부 상태
    
    const nav = useNavigate(); 

    const qnaList = () => {
        axios.get("/inquiry/list").then((res)=>{
            console.log(res.data);
            setList(res.data);
        })
    }

    useEffect(()=>{
        qnaList();
    }, []);

    // 미답변만 보기 체크 이벤트 핸들러
    const handleShowUnansweredOnlyChange = (event) => {
        setShowUnansweredOnly(event.target.checked);
    };

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
                        {/* 미답변만 보기 체크박스 */}
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
                
                {list &&
                    list.map((data, idx) => (
                    // 미답변만 보기 체크된 경우에만 미답변인 경우만 표시
                    (!showUnansweredOnly || !data.answer) && (
                        <InquiryHistoryRowItem
                            key={idx}
                            data={data}
                        />
                    )
                ))}
            </div>
        </div>
    );
};

export default InquiryHistory;