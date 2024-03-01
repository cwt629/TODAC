import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../../PageHeader';

const InquiryHistoryDetail = () => {
    const { inquirycode } = useParams();
    const nav = useNavigate();
    const [selectQnaData, setSelectQnaData] = useState("");

    //inquirycode에 대한 dto를 얻어서 selectQnaData에 넣는다
    const getSelectQnaData = () => {
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
        { name: "관리자 홈", url: "/admin" },
        { name: "1:1 문의내역", url: "/admin/InquiryHistory" },
        { name: "1:1 문의답변", url: "" },
    ];
    
    const PAGE_TITLE = "1:1 문의답변";

    return (
        <div className='mx_30'>
            <div>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            </div>

            <div className='mt_25' style={{textAlign:"center"}}>
                <img src={selectQnaData.memberPhoto} alt="프로필 사진" style={{width:"100px", borderRadius:'100px'}}/>
                <div className='fw_800 mt_10'>{selectQnaData.memberNickname}</div>
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
                    A. 문의 답변&nbsp;<span className='fs_14 fw_600'>({selectQnaData.answereddate})</span> 
                </div>
                <div className='mt_10 bg_blue3 bor_blue3 br_5 p-2' style={{minHeight:"150px"}}>
                    {selectQnaData.answer}
                </div>
            </div>

            <div className='d-flex mt_45 justify-content-center'>
                    <button className='deepblue' type='button' onClick={() => nav('/admin/InquiryHistory')}>
                        문의  목록으로
                    </button>
            </div>
        </div>
    );
};

export default InquiryHistoryDetail;