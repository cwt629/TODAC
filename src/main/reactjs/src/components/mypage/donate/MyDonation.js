import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MyDonation = () => {
    const [member,setMember]=useState([]);
    const storedId = sessionStorage.getItem("id");
    const [donationAmount,setDonationAmount]=useState(0);
    const ReactSwal = withReactContent(Swal);
    const nav = useNavigate();
    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setMember(res.data);

            })
    }

    const donate = () => {
        const url = "/donate?amount="+donationAmount+"&userid="+storedId;
        axios.post(url)
            .then(res=>{
                if(res.data===false){
                    ReactSwal.fire({
                        icon: 'warning',
                        html: '포인트가 부족합니다',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#FF7170'
                    })
                }
                else{
                    ReactSwal.fire({
                        icon: 'success',
                        html: '후원 감사합니다!',
                        cancelButtonText: '확인',
                        cancelButtonColor: '#9396A6'
                    }).then(()=>{
                        window.location.reload();
                    })
                }

            })
    }

    useEffect(() => {
        getmember();
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to="/user">마이 홈 {'>'} </Link>
                <Link to="/user/inquiry">1:1 문의</Link>
            </div>
            <div className='fs_25 fw_700'>나도 후원하기</div>

            <div style={{textAlign: "center"}}>
                <img alt="" src={require("../../../image/donationIcon/DonationMainIcon.png")}/>
                <h6>후원자분들의 후원금은 자선단체를 통해 도움이 필요한 분들에게 전달 됩니다.</h6>
                <h4>보유 포인트 : <span style={{color: "#FF7170"}}>{member.point}</span></h4>
            </div>
            후원 희망 포인트<br/>
            <div>
                <input className="bg_red bor_red" type={"text"} value={donationAmount}
                       onChange={(e) => {
                           setDonationAmount(e.target.value);
                       }}/>
            </div>
                <button className="bg_blue bor_blue1"
                        onClick={donate}>후원하기
                </button>
        </div>
    );
};

export default MyDonation;