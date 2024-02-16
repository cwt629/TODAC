import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChattingLogStyle.css';
import axios from 'axios';

const ChattingLogList = () => {
    const SORT_FILTERS = ["최신순", "1번 상담사", "2번 상담사", "3번 상담사", "4번 상담사", "5번 상담사", "6번 상담사"];
    const [filter, setFilter] = useState("");
    const [showMore, setShowMore] = useState(false);
    const tableRef = useRef(null);
    const [list, setList] = useState([]);

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
                console.log(data);
            })
    }, [])

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/loglist" className='col_blue2'>상담기록</Link>
            </div>
            <div className='fs_25 fw_700'>나의 상담기록</div>

            <br />

            <div className='input-group' style={{ justifyContent: 'right', alignItems: 'center' }}>
                <div className='fs_10 fw_700'>정렬 기준</div>
                &emsp;
                <div>
                    <select onChange={handleFilterSelect} value={filter} className='selectCounselor fs_14 bor_red bg_red mt_10'>
                        <option value="" disabled hidden>선택</option>
                        {
                            SORT_FILTERS.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <br /><br />

            {/* 로그 테이블 출력 */}
            <div className="table-container" style={{ maxHeight: showMore ? 'none' : '652px', overflowY: 'hidden' }}>
                {/* TODO: bootstrap 클래스 때문에 스타일이 안먹으므로, 추후 표는 다른 방법으로 디자인 필요 */}
                <table className='table table-bordered' ref={tableRef}>
                    <thead>
                        <tr>
                            <th className='bg_red'>번호</th>
                            <th className='bg_red'>날짜</th>
                            <th className='bg_red'>상담사</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 테이블 내용 */}
                        {
                            list.map((data, index) => (
                                <tr key={index}
                                    onClick={() => alert(`${index + 1}번줄 클릭함`)}>
                                    <td>{index + 1}</td>
                                    <td>{data.date ? (
                                        <span>
                                            {data.datePieces.day}&nbsp;
                                            <span className='col_red'>{data.datePieces.dayOfWeek}</span>&nbsp;
                                            {data.datePieces.time}
                                        </span>
                                    ) : '요약본 미발급'}</td>
                                    <td>{data.counselorname}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            <br /><br />

            <div style={{ textAlign: 'center' }}>
                <button onClick={handleShowMore} className='btn bor_blue1 bg_blue' style={{ color: '#536179' }}>
                    {showMore ? '간략히 보기' : '더 보기'}
                </button>
            </div>
        </div >
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
