import React, {useEffect, useState} from 'react';
import PageHeader from "../../PageHeader";
import ChatLogMidbar from "../../chat/chattinglog/content/ChatLogMidbar";
import ChatLogContent from "../../chat/chattinglog/content/ChatLogContent";
import ChatLogButtons from "../../chat/chattinglog/content/ChatLogButtons";
import axios from "axios";
import MyDonation from "./MyDonation";

const DonationContent = () => {
    const storedId = sessionStorage.getItem("id");
    const [member,setMember]=useState([]);
    const PAGE_TITLE = '후원하기';
    const CURRENT_ROUTES = [
        { name: '마이 홈', url: '/user' },
        { name: '후원', url: '' }
    ];

    const getmember = () => {
        const url = "/member/info?userid=" + storedId;
        axios.post(url)
            .then(res => {
                setMember(res.data);

            })
    }

    useEffect(() => {
        getmember();
    }, []);

    return (
        <div className='mx_30 '>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE}/>
            <MyDonation member={member}/>
        </div>
    );
};

export default DonationContent;