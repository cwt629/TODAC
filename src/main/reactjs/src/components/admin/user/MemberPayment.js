import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination, InputAdornment, IconButton, Input } from "@mui/material";
import PageHeader from "../../PageHeader";

const MemberPayment = () => {
    const nav = useNavigate();
    const [pay, setPay] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const [member, setMember] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);

    //시작일과 종료일을 관리하는 state
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '/admin/MemberManage' },
        { name: '회원 정보', url: `/admin/MemberManage/MemberProfile?usercode=${usercode}` },
        { name: '회원 결제내역', url: '' }
    ];
    const PAGE_TITLE = "회원 결제내역";

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            // 기간 내 결제내역을 불러오도록 수정
            fetchPay(usercode, startDate, endDate);
        }
    }, [usercode, startDate, endDate]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {}).then((res) => {
            setMember(res.data);
        });
    };

    const fetchPay = async (usercode, startDate, endDate) => {
        setLoading(true);
        let url = `/admin/payment?usercode=${usercode}`;

        if (startDate && endDate) {
            url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }

        try {
            const res = await axios.post(url);
            const chargeItems = res.data.filter((item) => item.type === "충전");
            const sortedChargeItems = chargeItems.sort((a, b) => {
                return new Date(b.applieddate) - new Date(a.applieddate);
            });

            setPay(sortedChargeItems);
        } catch (error) {
            console.error("결제내역을 불러오는 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    // 기간에 해당하는 결제 내역만을 필터링한 배열을 계산
    const filteredPay = pay.filter(item => {
        return (!startDate || new Date(item.applieddate) >= startDate) &&
            (!endDate || new Date(item.applieddate) <= endDate);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPay.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredPay.length / itemsPerPage);
    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <div className='fs_25 fw_700 mt_25' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img alt='' src={member.photo} style={{ width: "15vh", height: "15vh", borderRadius: "50%" }} />
                    <span className='fs_22 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            <br />
            <div style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* 시작일 입력 필드 */}
                <Input
                    type='date'
                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                    startAdornment={
                        <InputAdornment position='start'>
                            <span className='mobile-label'>시작일</span>
                        </InputAdornment>
                    }
                    style={{ marginBottom: '10px', width: '80%' }}
                />
                {/* 종료일 입력 필드 */}
                <Input
                    type='date'
                    value={endDate ? endDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                    startAdornment={
                        <InputAdornment position='start'>
                            <span className='mobile-label'>종료일</span>
                        </InputAdornment>
                    }
                    style={{ marginBottom: '20px', width: '80%' }}
                />
            </div>
            <div className='fs_17 fw_800' style={{ marginBottom: '5px' }}>
                <span className='col_blue2'>{member.nickname}</span> 님의 결제 내역
            </div>
            {filteredPay.length === 0 ? (
                <div className='fs_14' style={{ marginTop: '10px' }}>
                    결제 내역이 없습니다.
                </div>
            ) : (
                currentItems.map((item, index) => (
                    <div
                        key={index}
                        className='bg_gray bor_gray1 px-3 py-2'
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <span className='fw_700'>{item.applieddate}</span>
                            </div>
                            <div>
                                <span className='fs_15 w_500'>{item.type}</span>
                            </div>
                        </div>
                        <div style={{ marginTop: "8px" }}>
                            <span className='fw_600 col_blue2'>{item.amount}</span>
                            <span className='fw_600'>원 결제</span>
                        </div>
                    </div>
                ))
            )}
            {/* Pagination */}
            <div className='justify-content-center d-flex mt-3 qnaPage_btn'>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape='rounded'
                    variant='outlined'
                    color='primary'
                    hidePrevButton
                    hideNextButton
                    hideFirstButton
                    hideLastButton
                />
            </div>
        </div>
    );
};

export default MemberPayment;