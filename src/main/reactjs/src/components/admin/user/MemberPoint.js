import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { Pagination } from '@mui/material';
import PageHeader from '../../PageHeader';

const MemberPoint = () => {
    const nav = useNavigate();
    const [point, setPoint] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const [member, setMember] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [selectedType, setSelectedType] = useState("all");

    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '/admin/MemberManage' },
        { name: '회원 정보', url: `/admin/MemberManage/MemberProfile?usercode=${usercode}` },
        { name: '회원 TP 사용내역', url: '' }
    ];

    const PAGE_TITLE = "회원 TP 사용내역";

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

    const handleTypeChange = (event) => {
        const newSelectedType = event.target.value;
        setSelectedType(newSelectedType);
        setCurrentPage(1); // 유형이 변경될 때 페이지를 첫 번째 페이지로 재설정
    };

    // 날짜를 내림차순으로 정렬
    const sortedPoint = point.sort((a, b) => new Date(b.applieddate) - new Date(a.applieddate));

    // 선택된 유형에 따라 데이터 필터링
    const filteredPoint = selectedType === "all" ? sortedPoint : sortedPoint.filter(item => item.type === selectedType);

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPoint.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPoint.length / itemsPerPage);

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
            <br /><br />
            <div className='fs_17 fw_800' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span className='col_blue2'>{member.nickname}</span> 님의 TP 사용내역
                </div>
                <div style={{ textAlign: 'right' }}>
                    <label htmlFor="typeSelect" className='dropdown-toggle white pressable' type='button' data-bs-toggle="dropdown">
                        {selectedType === 'all' ? '전체' : selectedType}
                    </label>
                    <ul className='dropdown-menu' style={{ marginTop: '6px' }}>
                        <li key="all" value="all" onClick={() => handleTypeChange({ target: { value: 'all' } })}>
                            <a className={`dropdown-item ${selectedType === 'all' ? 'fw_600' : ''}`} href='#'
                                style={{ color: (selectedType === 'all') ? 'var(--deepblue)' : 'var(--mainblack)' }}>전체</a>
                        </li>
                        {
                            Array.from(new Set(sortedPoint.map(item => item.type))).map((type, index) => (
                                <li key={index} value={type} onClick={() => handleTypeChange({ target: { value: type } })}>
                                    <a className={`dropdown-item ${type === selectedType ? 'fw_600' : ''}`} href='#'
                                        style={{ color: (type === selectedType) ? 'var(--deepblue)' : 'var(--mainblack)' }}>{type}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            {filteredPoint.length === 0 ? (
                <div className='fs_14' style={{ marginTop: '10px' }}>
                    TP 사용내역이 없습니다.
                </div>
            ) : (
                currentItems.map((item, index) => (
                    <div key={index} className='bg_gray bor_gray1 px-3 py-2' style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <span className='fw_700'>{item.applieddate}</span>
                            </div>
                            <div>
                                <span className='fs_15 w_500'>{item.type}</span>
                            </div>
                        </div>
                        <div style={{ marginTop: '8px' }}>
                            <span className='fw_600 col_blue2'>{item.amount}</span>
                            <span className='fw_600'> TP</span>
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
