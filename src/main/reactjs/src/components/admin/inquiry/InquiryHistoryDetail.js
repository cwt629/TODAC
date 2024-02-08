import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const InquiryResponse = () => {
    const { inquirycode } = useParams();
    const nav = useNavigate();
    const [selectQnaData, setSelectQnaData] = useState("");

    //inquirycode에 대한 dto를 얻어서 selectQnaData에 넣는다
    const getSelectQnaData = () => {
        const url = "/user/inquiry/select";
        axios.post(url, {inquriycode:inquirycode})
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
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/InquiryHistory" className='col_blue2'>문의 관리 {'>'}</Link>
                <Link to="/admin/InquiryHistory/InquiryResponse" className='col_blue2'>1:1 문의답변 </Link>
            </div>
            <div className='fs_25 fw_700'>1:1 문의답변</div>

            <div className='mt_45'>
                <div className='fs_18 fw_700'>
                    Q. {selectQnaData.title}
                </div>
                <div className='mt_10 bg_red bor_red br_5 p-2' style={{height:"200px"}}>
                    {selectQnaData.inquiry}
                </div>
            </div>

            <div className='mt_25'>
                <div className='fs_18 fw_700'>
                    A. 문의 답변 
                </div>
                <div className='mt_10 bg_blue bor_blue1 br_5 p-2' style={{height:"200px"}}>
                    {selectQnaData.answer ? selectQnaData.answer : '답변을 달아주세요.'}
                </div>
            </div>

            <div className='d-flex mt_45 inquiry_btn'>
                    <button type='button' onClick={() => nav('/admin/InquiryHistory')}>
                        문의  목록으로
                    </button>
            </div>
        </div>
    );
};

export default InquiryResponse;