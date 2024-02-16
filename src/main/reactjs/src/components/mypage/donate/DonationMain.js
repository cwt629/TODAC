import React, {useState} from 'react';
import {Link} from "react-router-dom";
import axios from "axios";

const DonationMain = () => {
    const [totaldonation,setTotaldonation]=useState('');
    const getAllDonation = ()=>{
        axios.post("/getall/donation")
            .then(res => {
                setTotaldonation(res.data);
            })

    }

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의</Link>
            </div>
            <div className='fs_25 fw_700'>후원의 전당</div>
            <div>
                총 모금액 :
                <img alt="" src={require("../../../image/donationIcon/DonationMainIcon.png")}/>
                후원자분들의 후원금은 자선단체를 통해 도움이 필요한 분들에게 전달 됩니다.
            </div>
            <div>
                명예후원자

            </div>
        </div>
    );
};

export default DonationMain;