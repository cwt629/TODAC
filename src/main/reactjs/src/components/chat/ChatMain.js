import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatMain = () => {
    const nav = useNavigate();
    const [counselorList, setCounselorList] = useState([]);

    useEffect(() => {
        axios.get('/counselor/list')
            .then((res) => {
                console.log(res);
            })
    }, [])

    return (
        <div>
            <button className='btn btn-info'
                onClick={() => nav('counsel')}>상담 시작</button>
        </div>
    );
};

export default ChatMain;