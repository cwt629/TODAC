import React, { useState, useEffect } from 'react';
import './ChattingLogStyle.css';
import axios from 'axios';
import PageHeader from '../../PageHeader';
import ChatListFilter from './list/ChatListFilter';
import ChatListTable from './list/ChatListTable';
import ChatListButtons from './list/ChatListButtons';

const ChattingLogList = () => {
    const DISPLAY_PER_UNIT = 8;

    const [dateOrderAsc, setDateOrderAsc] = useState(true); // 날짜에 대해 오름차순이면 true, 내림차순이면 false
    const [counselor, setCounselor] = useState("모든 상담사");
    const [counselorFilters, setCounselorFilters] = useState(["모든 상담사"]);
    const [list, setList] = useState([]); // 초기에 받아오는 전체 데이터
    const [showLength, setShowLength] = useState(DISPLAY_PER_UNIT); // 화면에 보여줄 요소의 개수
    const [listDisplay, setListDisplay] = useState([]); // 화면에 보여줄 리스트 배열

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '상담기록', url: '' }
    ];

    const PAGE_TITLE = '나의 상담기록';

    const handleDateOrderClick = () => {
        setDateOrderAsc(!dateOrderAsc);
        console.log(dateOrderAsc);
    }

    const handleCounselorSelect = (e) => {
        setCounselor(e.target.value);
    };

    const handleExpandDisplay = () => {
        setShowLength(showLength + DISPLAY_PER_UNIT);
    };

    const handleShrinkDisplay = () => {
        setShowLength(DISPLAY_PER_UNIT);
    }

    // 첫 로딩 시, 상담사 목록과 현재 로그인한 유저의 채팅방 목록을 불러온다
    useEffect(() => {
        let usercode = sessionStorage.getItem("usercode");
        if (!usercode) return;

        axios.get("/counselor/list")
            .then((res) => {
                setCounselorFilters(["모든 상담사", ...res.data.map((counselor) => (counselor.name))])
            })

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
                setListDisplay(data);
            })
    }, [])

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <ChatListFilter dateOrderAsc={dateOrderAsc} handleDateOrderClick={handleDateOrderClick}
                counselor={counselor} filterList={counselorFilters}
                handleCounselorSelect={handleCounselorSelect} />
            <ChatListTable list={listDisplay} showLength={showLength} />
            <ChatListButtons needToShow={listDisplay.length > DISPLAY_PER_UNIT}
                displayedAll={listDisplay.length <= showLength}
                handleExpandDisplay={handleExpandDisplay}
                handleShrinkDisplay={handleShrinkDisplay} />
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
