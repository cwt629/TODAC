import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

const InquiryDetail = () => {
    const { inquirycode } = useParams();
    const nav = useNavigate();
    const [selectQnaData, setSelectQnaData] = useState("");

    //inquiry에 대한 dto를 얻어서 selectQnaData에 넣는다
    const getSelectQnaData = () => {
        console.log(inquirycode);
        const url = "/user/inquiry/select?inquirycode=" + inquirycode;
        axios.get(url)
          .then(res => {
            setSelectQnaData(res.data.qna);
          })
          .catch(error => {
            console.error("Error fetching inquiry data:", error);
          });
    };

    //처음 로딩시 딱 한번 호출
    useEffect(() => {
        console.log("detail,useEffect");
        getSelectQnaData();
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의 {'>'} </Link>
                <Link to="/user/inquiry/detail/:inquirycode">1:1 문의 답변</Link>
            </div>
            <div className='fs_25 fw_700'>1:1 문의 답변</div>

            <div className='mt_45'>
                <div className='fs_18 fw_700'>
                    Q. 나의 문의
                </div>
                <div className='mt_10 bg_red bor_red br_5' style={{height:"100px"}}>
                    {selectQnaData.title}
                </div>
            </div>

            <div className='mt_25'>
                <div className='fs_18 fw_700'>
                    A. 문의 답변 
                </div>
                <div className='mt_10 bg_blue bor_blue1 br_5' style={{height:"250px"}}>
                    {selectQnaData.inquiry}
                </div>
            </div>

            <div className='d-flex mt_45 inquiry_btn justify-content-evenly'>
                    <button type='button' onClick={() => nav('../form')}>
                        문의 다시하기
                    </button>
                    <button type='button' onClick={() => nav('../')}>
                        문의  목록으로
                    </button> 
            </div>
        </div>
    );
};

export default InquiryDetail;