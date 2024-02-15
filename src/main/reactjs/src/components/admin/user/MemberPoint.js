import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination } from '@mui/material';

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
        axios.post(`/admin/payment?usercode=${usercode}`)
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
                <Link to="/admin/MemberManage/MemberProfile/MemberPoint" className='col_blue2'>회원 포인트 사용내역</Link>
            </div>
            <div className='fs_25 fw_700'>회원 포인트 사용 내역</div>

            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '25vh', height: '25vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>
            <div className='fs_17 fw_800'>{member.nickname} 님의 포인트 사용내역 검색</div>

            {/* 검색창 */}
            <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="타입을 검색하세요"
                className="form-control mb-3 bg_red col_gray fs_16 fw_800"
                style={{ '::placeholder': { color: 'lightgray' } }}
            />
            <div className="fs_17 fw_800">{member.nickname} 님의 포인트 사용내역</div>
            {currentItems.map((item, index) => (
                <div key={index} className="bg_gray bor_gray1 px-3 py-2">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span className="fw_600">{item.applieddate}</span> &ensp;
                            <span className="fw_600">{item.type}</span>
                        </div>
                    </div>
                    <div className="fs_14">{item.recordcode}</div>
                </div>
            ))}

            {/* Pagination */}
            <div className="justify-content-center d-flex mt-3 qnaPage_btn">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </div>
        </div>
    );
};

export default MemberPoint;
