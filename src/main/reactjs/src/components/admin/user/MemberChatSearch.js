import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


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

            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '25vh', height: '25vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>
            <div className='fs_17 fw_800'>{member.nickname} 님의 채팅 기록 검색</div>

            {/* 검색창 */}
            <OutlinedInput
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색할 상담사를 입력해주세요"
                className="form-control mb-3 bg_red col_gray fs_16 fw_800"
                style={{
                    '::placeholder': { color: 'gray' },
                    height: '40px',
                    padding: '8px',
                    borderRadius: '5px',
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
            />
            <div className="fs_17 fw_800">{member.nickname} 님의 채팅 기록</div>
            {currentItems.map((item, index) => (
                <div key={index} className="bg_gray bor_gray1 px-3 py-2" style={{ borderRadius: '5px' }}
                    onClick={() => nav(`/admin/MemberManage/MemberProfile/MemberChatSearch/MemberChatHistory?usercode=` + member.usercode)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span className="fw_600">{item.counselorname} 상담사</span>
                        </div>
                    </div>
                    <div className="fs_14">{item.date}</div>
                </div>
            ))}

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

export default MemberChatSearch;