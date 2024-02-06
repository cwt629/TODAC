import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

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
        <div>
            <button onClick={getSelectQnaData}>dkdkdkdkdkd</button>
            {selectQnaData.title}
        </div>
    );
};

export default InquiryDetail;