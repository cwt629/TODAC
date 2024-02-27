import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination, InputAdornment, OutlinedInput, Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


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
        axios.post(`/admin/point?usercode=${usercode}`)
            .then(res => {
                setPoint(res.data);
            })
            .catch(error => {
                console.error("포인트 사용내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 검색어와 일치하는 포인트 사용내역만 필터링
    const filteredPoint = point.filter(item => item.type.includes(searchQuery));

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPoint.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPoint.length / itemsPerPage);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberPoint" className='col_blue2'> 회원 포인트 사용내역</Link>
            </div>
            <div className='fs_25 fw_700'>회원 포인트 사용 내역</div> <br />

            <div className='fs_25 fw_700' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt='' src={member.photo} style={{ width: '15vh', height: '15vh', borderRadius: '50%' }} />
                    <span className='fs_25 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            {/* <div className='fs_17 fw_800'>{member.nickname} 님의 포인트 사용내역 검색</div> */}
            <br />
            {/* 검색창 */}
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
            <div className="fs_17 fw_800">{member.nickname} 님의 포인트 사용내역</div>
            {currentItems.map((item, index) => (
                <div key={index} className="bg_gray bor_gray1 px-3 py-2" style={{ borderRadius: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span className="fw_600">{item.applieddate}</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <span className="fw_600 col_blue2">{item.amount}</span><span className='fw_600'> P</span>
                        </div>
                    </div>
                    <div className="fs_15 w_500">{item.type}</div>
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

export default MemberPoint;
