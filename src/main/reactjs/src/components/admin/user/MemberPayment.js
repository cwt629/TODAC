import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination, InputAdornment, IconButton, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

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

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchPay(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {}).then((res) => {
            setMember(res.data);
        });
    };

    const fetchPay = (usercode) => {
        setLoading(true);
        axios
            .post(`/admin/payment?usercode=${usercode}`)
            .then((res) => {
                // '충전'인 항목만 필터링
                const chargeItems = res.data.filter((item) => item.type === "충전");
                setPay(chargeItems);
            })
            .catch((error) => {
                console.error("결제내역을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 검색어와 일치하는 결제내역만 필터링
    const filteredPay = pay.filter((item) => item.applieddate.includes(searchQuery) && item.type === "충전");

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPay.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPay.length / itemsPerPage);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to='/admin' className='col_blue2'>
                    관리자 홈 {">"}{" "}
                </Link>
                <Link to='/admin/MemberManage' className='col_blue2'>
                    회원 관리 {">"}{" "}
                </Link>
                <Link to={`/admin/MemberManage/MemberProfile?usercode=${usercode}`} className='col_blue2'>
                    회원 정보 {">"}
                </Link>
                <span className='col_blue2'>&nbsp;회원 결제내역</span>
            </div>
            <div className='fs_25 fw_700'>회원 결제내역</div> <br />
            <div className='fs_25 fw_700' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img alt='' src={member.photo} style={{ width: "15vh", height: "15vh", borderRadius: "50%" }} />
                    <span className='fs_22 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            <br />
            {/* 검색창 */}
            <Input
                id='search'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='검색할 날짜를 입력해주세요'
                className='form-control mb-3 fs_16 fw_800'
                style={{
                    height: "40px",
                    padding: "8px",
                    borderBottom: "1px solid #D4E4F2",
                    borderRadius: "0",
                    border: "none",
                }}
                startAdornment={
                    <>
                        {searchQuery && (
                            <InputAdornment position='start'>
                                <IconButton onClick={() => setSearchQuery("")}>
                                    <ClearIcon />
                                </IconButton>
                            </InputAdornment>
                        )}
                    </>
                }
                endAdornment={
                    <InputAdornment position='end'>
                        <SearchIcon />
                    </InputAdornment>
                }
            />
            <br />
            <br />
            <div className='fs_17 fw_800'>
                <span className='col_blue2'>{member.nickname}</span> 님의 결제 내역
            </div>
            {currentItems.map((item, index) => (
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
            ))}
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
