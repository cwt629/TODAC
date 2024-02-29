import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination, InputAdornment, OutlinedInput, Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import PageHeader from '../../PageHeader';


const MemberPoint = () => {
    const nav = useNavigate();
    const [point, setPoint] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const [member, setMember] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '/admin/MemberManage' },
        { name: '회원 정보', url: `/admin/MemberManage/MemberProfile?usercode=${usercode}` },
        { name: '회원 포인트 사용내역', url: '' }
    ];
    const PAGE_TITLE = "회원 포인트 사용내역";

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchPoint(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const fetchPoint = (usercode) => {
        setLoading(true);
        axios
            .post(`/admin/point?usercode=${usercode}`)
            .then((res) => {
                setPoint(res.data);
            })
            .catch((error) => {
                console.error("포인트 사용내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 검색어와 일치하는 포인트 사용내역만 필터링
    const filteredPoint = point.filter((item) => item.type.includes(searchQuery));

    // 날짜를 내림차순으로 정렬
    const sortedPoint = filteredPoint.sort((a, b) => new Date(b.applieddate) - new Date(a.applieddate));

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedPoint.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedPoint.length / itemsPerPage);

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='fs_25 fw_700 mt_25' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt='' src={member.photo} style={{ width: '15vh', height: '15vh', borderRadius: '50%' }} />
                    <span className='fs_25 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            <br />
            <Input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색할 타입을 입력해주세요"
                className="form-control mb-3 fs_16 fw_800"
                style={{
                    height: '40px',
                    padding: '8px',
                    borderBottom: '1px solid #D4E4F2',
                    borderRadius: '0',
                    border: 'none',
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
                <span className="col_blue2">{member.nickname}</span> 님의 포인트 사용 내역
            </div>
            {filteredPoint.length === 0 ? (
                <div className='fs_14' style={{ marginTop: '10px' }}>
                    포인트 내역이 없습니다.
                </div>
            ) : (
                currentItems.map((item, index) => (
                    <div key={index} className="bg_gray bor_gray1 px-3 py-2" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <span className="fw_700">{item.applieddate}</span>
                            </div>
                            <div>
                                <span className="fs_15 w_500">{item.type}</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <span className="fw_600 col_blue2">{item.amount}</span>
                            <span className='fw_600'> P</span>
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

export default MemberPoint;
