import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination, InputAdornment, Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PageHeader from '../../PageHeader';

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
    const [diagnosisFilter, setDiagnosisFilter] = useState('all'); // 'all', 'issued', 'notIssued'

    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '/admin/MemberManage' },
        { name: '회원 정보', url: `/admin/MemberManage/MemberProfile?usercode=${usercode}` },
        { name: '회원 채팅기록', url: '' }
    ];
    const PAGE_TITLE = "회원 채팅기록";

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
        axios
            .get(`/chat/list?usercode=${usercode}`)
            .then((res) => {
                // 채팅 내역을 날짜 기준으로 내림차순으로 정렬
                const sortedChat = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setChat(sortedChat);
            })
            .catch((error) => {
                console.error("채팅 내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSelectChange = (event) => {
        setDiagnosisFilter(event.target.value);
    };

    const filteredChat = chat.filter((item) => item.counselorname.includes(searchQuery));

    // 진단서 발급 여부에 따라 필터링
    const filteredByDiagnosis = filteredChat.filter((item) => {
        if (diagnosisFilter === 'all') {
            return true; // 모든 항목 표시
        } else if (diagnosisFilter === 'issued') {
            return item.diagnosiscode > 0; // 진단서 발급된 항목만 표시
        } else {
            return item.diagnosiscode <= 0; // 진단서 미발급된 항목만 표시
        }
    });

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredByDiagnosis.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredByDiagnosis.length / itemsPerPage);

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='fs_25 fw_700 mt_25' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt='' src={member.photo} style={{ width: '15vh', height: '15vh', borderRadius: '50%' }} />
                    <span className='fs_22 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            <br />
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
                    textAlign: 'left'
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
            <br /><br />
            <div className="fs_17 fw_800">
                <span className="col_blue2">{member.nickname}</span> 님의 채팅 기록
                {/* 진단서 발급 여부 선택하는 select 요소 추가 */}
                <div className="dropdown-center">
                    <label htmlFor="diagnosisFilterSelect" className="mr-2"></label>
                    <select
                        id="diagnosisFilterSelect"
                        value={diagnosisFilter}
                        onChange={handleSelectChange}
                        className="diagnosis-filter-select white pressable" // 추가된 부분
                    >
                        <option value="all">전체</option>
                        <option value="issued">진단서 발급</option>
                        <option value="notIssued">진단서 미발급</option>
                    </select>
                </div>
            </div>

            {filteredByDiagnosis.length === 0 ? (
                <div className="fs_14" style={{ marginTop: '10px' }}>
                    채팅 내역이 없습니다.
                </div>
            ) : (
                currentItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg_gray bor_gray1 px-3 py-2"
                        onClick={() =>
                            nav(
                                `/admin/MemberManage/MemberProfile/MemberChatSearch/MemberChatHistory?usercode=${member.usercode}&chatroomcode=${item.chatroomcode}`
                            )
                        }
                    >
                        <div className="input-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <span><img alt="" src={item.counselorphoto} style={{ width: '40px', height: '40px', borderRadius: '50px' }} /></span>&nbsp;
                                </div>
                            </div>
                            &nbsp;
                            <div>
                                <span className="fw_600">{item.counselorname} 상담사</span>
                                <div className="fs_15 input-group">
                                    {getDateFormatPieces(item.date).day}&nbsp;
                                    {item.diagnosiscode > 0 ? (
                                        <div> | <span className="col_blue2 fs_14">진단서 발급</span></div>
                                    ) : (
                                        <div> | <span className="col_red fs_14">진단서 미발급</span></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}

            {/* Pagination */}
            <div className="justify-content-center d-flex mt-3 qnaPage_btn">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    variant="outlined"
                    color="primary"
                    hidePrevButton
                    hideNextButton
                    hideFirstButton
                    hideLastButton
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
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hour = ('0' + date.getHours()).slice(-2);
    const minute = ('0' + date.getMinutes()).slice(-2);
    const second = ('0' + date.getSeconds()).slice(-2);

    // 요일
    const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

    return {
        day: `${year}-${month}-${day}`,
        dayOfWeek: dayOfWeek,
        time: `${hour}:${minute}:${second}`,
    };
}

export default MemberChatSearch;