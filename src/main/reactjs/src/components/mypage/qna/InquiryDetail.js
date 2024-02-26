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
        //const url = "/user/inquiry/select?inquirycode="+inquirycode;
        //axios.post(url)
        const url = "/user/inquiry/select";
        axios.post(url, {inquirycode:inquirycode})
          .then(res => {
            setSelectQnaData(res.data);
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
                    Q. {selectQnaData.title}
                </div>
                <div className='mt_10 bg_blue3 bor_blue3 br_5 p-2' style={{height:"200px"}}>
                    {selectQnaData.inquiry}
                </div>
            </div>

            <div className='mt_25'>
                <div className='fs_18 fw_700'>
                    A. 문의 답변 
                </div>
                <div className='mt_10 bg_blue3 bor_blue3 br_5 p-2' style={{height:"200px"}}>
                    {selectQnaData.answer ? selectQnaData.answer : '아직 답변이 달리지 않았습니다.'}
                </div>
            </div>

            <div className='d-flex mt_45 inquiry_btn justify-content-evenly'>
                    <button type='button' onClick={() => nav('../')}>
                        문의  목록으로
                    </button>
                    <button type='button' onClick={() => nav('../form')}>
                        문의 다시하기
                    </button> 
            </div>
        </div>
    );
};

export default InquiryDetail;