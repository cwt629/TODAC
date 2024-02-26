import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination, InputAdornment, Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const MemberChatSearch = () => {
    const nav = useNavigate();
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const [member, setMember] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchChat(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const fetchChat = (usercode) => {
        setLoading(true);
        axios.get(`/chat/list?usercode=${usercode}`)
            .then(res => {
                setChat(res.data);
            })
            .catch(error => {
                console.error("채팅 내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }



    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 검색어와 일치하는 포인트 사용내역만 필터링
    const filteredChat = chat.filter(item => item.counselorname.includes(searchQuery));

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredChat.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredChat.length / itemsPerPage);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberChatSearch" className='col_blue2'>회원 채팅기록 </Link>
            </div>
            <div className='fs_25 fw_700'>회원 채팅 기록</div>

            <div className='fs_25 fw_700' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt='' src={member.photo} style={{ width: '15vh', height: '15vh', borderRadius: '50%' }} />
                    <span className='fs_25 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            {/* <div className='fs_17 fw_800'>{member.nickname} 님의 채팅 기록 검색</div> */}

            {/* 검색창 */}
            <Input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색할 상담사를 입력해주세요"
                className="form-control mb-3 fs_16 fw_800"
                style={{
                    height: '40px',
                    padding: '8px',
                    borderBottom: '1px solid #D4E4F2',
                    borderRadius: '0',
                    border: 'none',
                    textAlign: 'left', // 추가된 부분
                }}
                startAdornment={
                    <>
                        {searchQuery && (
                            <InputAdornment position="start">
                                <IconButton onClick={() => setSearchQuery('')}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )}
                    </>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
            <br />
            <div className="fs_17 fw_800">{member.nickname} 님의 채팅 기록</div>
            {currentItems.map((item, index) => {
                return (
                    <div key={index} className="bg_gray bor_gray1 px-3 py-2" style={{ borderRadius: '5px' }}
                        onClick={() => nav(`/admin/MemberManage/MemberProfile/MemberChatSearch/MemberChatHistory?usercode=${member.usercode}&chatroomcode=${item.chatroomcode}`)}>
                        <div className='input-group'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <span><img alt='' src={item.counselorphoto} style={{ width: '40px', height: '40px', borderRadius: '50px' }} /></span>&nbsp;
                                </div>
                            </div>
                            &nbsp;
                            <div>
                                <span className="fw_600">{item.counselorname} 상담사</span>
                                <div className="fs_15 ">{getDateFormatPieces(item.date).day}
                                </div>
                            </div>
                            <div>
                                <br />
                                {/* 진단서 발급 여부 표시 */}
                                {item.diagnosiscode > 0 ? <div> | <span className='col_blue2 fs_14'>진단서 발급</span></div> : <div> | <span className='col_red fs_14'>진단서 미발급</span></div>}
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Pagination */}
            <div className="justify-content-center d-flex mt-3 qnaPage_btn">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

// 날짜를 로그에 맞게 포매팅하는 함수
function getDateFormatPieces(str) {
    if (!str) return { day: '', dayOfWeek: '', time: '' }; // 날짜가 null인 경우 빈 객체 반환

    const date = new Date(str);

    // 년, 월, 일, 시, 분, 초 추출
    const year = date.getFullYear().toString();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);

    // 요일
    const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

    return {
        day: `${year}-${month}-${day}`,
        dayOfWeek: dayOfWeek,
        time: `${hour}:${minute}:${second}`
    };
}

export default MemberChatSearch;