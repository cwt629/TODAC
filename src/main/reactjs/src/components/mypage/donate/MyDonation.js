import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import "../pointStyle.css";

const MyDonation = ({member}) => {
    const usercode = sessionStorage.getItem("usercode");
    const [donationAmount,setDonationAmount]=useState();
    const ReactSwal = withReactContent(Swal);
    const nav = useNavigate();

    const donate = () => {
        const url = "/payment?amount="+donationAmount+"&usercode="+usercode+"&type=후원";
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
                        nav();
                    })
                }

            })
    }

    useEffect(() => {

    }, []);

    return (
    <div className="card">
        {/* Title */}
        <div className="title">
            <h1>Top chart</h1>
            <p>The world listened a lot of music this week.<br />Discover the ranking.</p>
        </div>
        {/*Rancking */}
        <div className="box"> {/* #01 */}
            {/* Number*/}
            <div className="number">01</div>
            {/* Cover */}
            <div className="cover"><img src="https://m.media-amazon.com/images/I/91-kmdlsEsL._SS500_.jpg" alt="" /></div>
            {/* Name */}
            <div className="name"><span>Mi gente</span> J Balin &amp; Willy William</div>
            {/* Button */}
            <div className="link"><a href="https://www.youtube.com/watch?v=wnJ6LuUFpMo">Listen</a></div>
        </div>
        {/* Separator */}
        <div className="separator" />
        <div className="box"> {/* #02 */}
            {/* Number*/}
            <div className="number">02</div>
            {/* Cover */}
            <div className="cover"><img src="http://bit.ly/2vlCeWf" alt="" /></div>
            {/* Name */}
            <div className="name"><span>Feels</span> Calvin Harris</div>
            {/* Button */}
            <div className="link"><a href="https://www.youtube.com/watch?v=ozv4q2ov3Mk">Listen</a></div>
        </div>
        {/* Separator */}
        <div className="separator" />
        <div className="box"> {/* #03 */}
            {/* Number*/}
            <div className="number">03</div>
            {/* Cover */}
            <div className="cover"><img src="http://bit.ly/2vlRum1" alt="" /></div>
            {/* Name */}
            <div className="name"><span>Attention</span> Charlie Puth</div>
            {/* Button */}
            <div className="link"><a href="https://www.youtube.com/watch?v=nfs8NYg7yQM">Listen</a></div>
        </div>
    </div>
    );
};

export default MyDonation;