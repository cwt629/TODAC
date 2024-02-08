import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InquiryRowItem from './InquiryRowItem';

const Inquiry = () => {
    const [list, setList] = useState([]);
    const [memberinfo, setMemberinfo] = useState([]);

    const user = sessionStorage.getItem("usercode");
    const nickname = sessionStorage.getItem("nickname");
    const id = sessionStorage.getItem("id");

    const nav = useNavigate(); 

    const qnaList = () => {
        axios.post("/user/inquiry?usercode="+user).then((res)=>{
            console.log(res.data.qna);
            setList(res.data.qna);
        })
    }

    const getmemberinfo = () => {
        axios.post("/member/info?userid="+id).then((res)=>{
            console.log(res.data);
            setMemberinfo(res.data);
        })
    }

    useEffect(()=>{
        qnaList();
        getmemberinfo();
    }, []);
    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의</Link>
            </div>
            <div className='fs_25 fw_700'>나의 문의내역</div>

            <div className='mt_45 fw_500'><span className='fw_900 col_blue1'>{memberinfo.nickname}</span> 님, <br/>무엇을 도와드릴까요?</div>

            <div className='d-flex mt_45 inquiry_list align-items-center'>
                <div className='me-auto fs_18 fw_700'>
                    1:1 문의내역
                </div>
                <div className='ml-auto'>
                    <button  onClick={() => nav('form')}>
                        <img alt='' src={require('../../../image/ico_inquiry.png')} className='img-fluid'/>
                        <span className='mx-2'>1:1 문의하기</span>
                    </button>
                </div>
            </div>
            
            <div className='mt_10'>
                <div className=''>
                {list &&
                    list.map((row, idx) => (
                        <InquiryRowItem
                        key={idx}
                        row={row}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Inquiry;