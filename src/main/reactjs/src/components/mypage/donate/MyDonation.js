import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import "../pointStyle.css";
import OneCoinOneHeart from "./OneCoinOneHeart";
import {popupAchievement} from "../../../utils/achieveAlert";

const MyDonation = ({member}) => {
    const usercode = sessionStorage.getItem("usercode");
    const [donationAmount,setDonationAmount]=useState("");
    const ReactSwal = withReactContent(Swal);
    const nav = useNavigate();

    const PAGE_TITLE = 'TODAC 채팅';

    const donate = () => {
        const url = "/donation?amount="+donationAmount+"&usercode="+usercode+"&type=후원";
        const reg = /^[0-9]*$/;
        if(donationAmount==""){
            ReactSwal.fire({
                icon: 'warning',
                html: '후원금을 입력해주세요',
                confirmButtonText: '확인',
                confirmButtonColor: '#5279FD'
            })
        }

        else if(donationAmount=="0"){
            ReactSwal.fire({
                icon: 'warning',
                html: '후원금을 입력해주세요',
                confirmButtonText: '확인',
                confirmButtonColor: '#5279FD'
            })
        }

        else if(!reg.test(donationAmount)){
            ReactSwal.fire({
                icon: 'warning',
                html: '올바른 금액을 입력해주세요',
                confirmButtonText: '확인',
                confirmButtonColor: '#5279FD'
            })
        }

        else{

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
                        axios.post(`/badgeinsert?usercode=${usercode}&achievename=기부자`)
                            .then(res=>{
                                if(res.data===true){
                                    popupAchievement("기부자");
                                }
                            })
                        nav("/user/community/donation")
                        //후원 후 뱃지 검사

                    })
                }

            })
        }
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <OneCoinOneHeart/>
                <div className="fs_14">후원자분들의 후원금은 자선단체를 통해 <br/> 도움이 필요한 분들에게 전달 됩니다.</div>
                <h4 className="mt_45">보유 TP : <span style={{color: "#FF7170"}}>{member.point?.toLocaleString()}</span></h4>
            </div>
            <div style={{ position: "relative", width: "100%" }}>
                <input 
                    className="bg_gray bor_gray2 col_black br_5 h_35 px-3" 
                    type={"number"} 
                    value={donationAmount}
                    onChange={(e) => {
                    setDonationAmount(e.target.value);
                    }} 
                    placeholder={"희망하는 후원 금액을 적어주세요."}
                    style={{ width: "100%" }} 
                />
                <button 
                    className="deepblue" 
                    onClick={donate} 
                    style={{ 
                    position: "absolute", 
                    right: "1px", 
                    top: "50%", 
                    transform: "translateY(-50%)", 
                    height: "37px" 
                    }}
                >
    후원하기
  </button>                
</div>
        </div>
    );
};

export default MyDonation;