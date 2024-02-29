import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DonationMainStyle.css";
import DonationMainContent from "./DonationMainContent";

const DonationMain = () => {
    const [totaldonation, setTotaldonation] = useState("");
    const [top3, setTop3] = useState([]);
    const getAllDonation = () => {
        axios.get("/getall/donation").then((res) => {
            setTotaldonation(res.data);
        });
    };

    const getTop3 = () => {
        axios.get("/get/top3Donor").then((res) => {
            setTop3(res.data);
            console.log(res.data);
        });
    };

    useEffect(() => {
        getAllDonation();
        getTop3();
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14 col_blue2'>
                <Link to='/user/community'>커뮤니티 {">"} </Link>
                <Link to='/user/community/donation'>후원의 전당</Link>
            </div>
            <div className='fs_25 fw_700'>후원의 전당</div>
            <div>
                <div style={{ textAlign: "center" }}>
                    <h4 className='mt_45'>
                        총 모금액 : <span style={{ color: "#FF7170" }}>{totaldonation?.toLocaleString()}</span>
                    </h4>
                    <img alt='' src={require("../../../image/donationIcon/DonationMainIcon.png")} className='mt_25' />
                </div>
                <DonationMainContent />

                {top3.map((item, index) => (
                    <div key={index}
                        className='mt_10 align-items-center'
                        style={{ display: "flex", position: "relative", justifyContent: "space-between" }}
                    >
                        <img
                            style={{ position: "absolute", top: "-7px", left: "-6px" }}
                            alt=''
                            src={require(`../../../image/donationIcon/rank${index}.png`)}
                        />
                        <img
                            style={{ width: "100px", height: "100px", borderRadius: "50px" }}
                            alt=''
                            src={item.photo}
                        />
                        <div>
                            <b>'{item.nickname}'</b> 님 후원금 :{" "}
                            <span style={{ color: "#FF7170" }}>{item.total_amount?.toLocaleString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DonationMain;
