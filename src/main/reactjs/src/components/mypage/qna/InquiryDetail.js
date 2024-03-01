import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PageHeader from '../../PageHeader';

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

    const CURRENT_ROUTES = [
        { name: "마이 홈", url: "/user" },
        { name: "나의 문의내역", url: "/user/inquiry" },
        { name: "1:1 문의답변", url: "" },
    ];
    
    const PAGE_TITLE = "1:1 문의답변";

    return (
        <div className='mx_30'>
            <div>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>

            <div className='mt_25'>
                <div className='fs_18 fw_700'>
                    Q. {selectQnaData.title}
                </div>
                <div className='mt_10 bg_blue3 bor_blue3 br_5 p-2' style={{minHeight:"150px"}}>
                    {selectQnaData.inquiry}
                </div>
            </div>

            <div className='mt_25'>
                <div className='fs_18 fw_700'>
                    A. 문의 답변&nbsp;{selectQnaData.answereddate && <span className='fs_14 fw_600'>({selectQnaData.answereddate})</span>}
                </div>
                <div className='mt_10 bg_blue3 bor_blue3 br_5 p-2' style={{minHeight:"150px"}}>
                    {selectQnaData.answer ? selectQnaData.answer : '아직 답변이 달리지 않았습니다.'}
                </div>
            </div>

            <div className='d-flex mt_45 justify-content-evenly'>
                    <button className='lightblue long' type='button' onClick={() => nav('../')}>
                        문의  목록으로
                    </button>
                    <button className='deepblue long' type='button' onClick={() => nav('../form')}>
                        문의 다시하기
                    </button> 
            </div>
        </div>
    );
};

export default InquiryDetail;