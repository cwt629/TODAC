import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChattingLogStyle.css';
import axios from 'axios';
import PageHeader from '../../PageHeader';
import ChatListFilter from './list/ChatListFilter';
import ChatListTable from './list/ChatListTable';
import ChatListButtons from './list/ChatListButtons';

const ChattingLogList = () => {
    const SORT_FILTERS = ["최신순", "1번 상담사", "2번 상담사", "3번 상담사", "4번 상담사", "5번 상담사", "6번 상담사"];
    const [filter, setFilter] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [list, setList] = useState([]);

    const nav = useNavigate();

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '상담기록', url: '' }
    ];

    const PAGE_TITLE = '나의 상담기록';

    const handleFilterSelect = (e) => {
        setFilter(e.target.value);
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    // 첫 로딩 시, 현재 로그인한 유저의 채팅방 목록을 불러온다
    useEffect(() => {
        let usercode = sessionStorage.getItem("usercode");
        if (!usercode) return;

        axios.get("/chat/list?usercode=" + usercode)
            .then((res) => {
                // 저장할 리스트(날/요일/시간을 구분지어 넣어준다)
                let data = res.data.map((info) => {
                    const datePieces = getDateFormatPieces(info.date);
                    return {
                        ...info,
                        datePieces: datePieces
                    };
                })
                setList(data);
            })
    }, [])

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <ChatListFilter filter={filter} filterList={SORT_FILTERS}
                handleFilterSelect={handleFilterSelect} />
            <ChatListTable list={list} showMore={showMore} />
            <ChatListButtons showMore={showMore} handleShowMore={handleShowMore} />
        </div>
    );
};

// 날짜를 로그에 맞게 포매팅하는 함수
function getDateFormatPieces(str) {
    if (!str) return null;

    const date = new Date(str);

    // 년, 월, 일, 시, 분, 초 추출
    const year = date.getFullYear().toString().slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);

    // 요일
    const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

    return {
        day: `${year}/${month}/${day}`,
        dayOfWeek: dayOfWeek,
        time: `${hour}:${minute}:${second}`
    };
}
export default ChattingLogList;
