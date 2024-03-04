import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Pagination, InputAdornment, Input, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "../../PageHeader";
import ClearIcon from '@mui/icons-material/Clear';
import PostNavigationButton from "./PostNavigationButton";

const MyBoardMain = () => {
    const nav = useNavigate();
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const usercode = sessionStorage.getItem("usercode");
    const [member, setMember] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const CURRENT_ROUTES = [
        { name: "내 정보", url: "/user" },
        { name: "게시글", url: "" },
    ];

    const PAGE_TITLE = "내가 쓴 게시물";

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchBoard(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {}).then((res) => {
            setMember(res.data);
        });
    };

    const fetchBoard = (usercode) => {
        setLoading(true);
        axios.post(`/admin/member/post?usercode=${usercode}`)
            .then(res => {
                const sortedBoard = res.data.sort((a, b) => {
                    // 날짜를 내림차순으로 정렬 (가정)
                    return new Date(b.registereddate) - new Date(a.registereddate);
                });

                setBoard(sortedBoard);
            })
            .catch(error => {
                console.error("게시글을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    //게시글 쓰러가기 이동 버튼
    const handlePostNavClick = () => {
        nav("../../../board/form");
    }
    // 검색어와 일치하는 게시글만 필터링
    const filteredBoard = board.filter((item) => item.title.includes(searchQuery));

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBoard.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBoard.length / itemsPerPage);

    // SweetAlert2 모달 창
    const openModal = (post) => {
        Swal.fire({
            title: post.title,
            imageUrl: `<div>${post.photo}</div>`,
            html: `<div>${post.content}</div>`,
            confirmButtonColor: "#FF7170",
            confirmButtonText: "닫기",
        });
    };

    // 게시글 삭제
    const deletePost = (boardcode) => {
        Swal.fire({
            title: "게시글 삭제",
            text: "해당 게시글을 삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ff7170",
            confirmButtonText: "예",
            cancelButtonText: "아니오",
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/post/delete?boardcode=${boardcode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 삭제 후 다시 게시글 목록을 불러옴
                        fetchBoard(usercode);
                        Swal.fire({
                            title: "삭제 완료",
                            text: "게시글이 성공적으로 삭제되었습니다.",
                            icon: "success",
                            confirmButtonColor: "#5279FD",
                            confirmButtonText: "확인"
                        });
                    })
                    .catch((error) => {
                        console.error("삭제 중 오류 발생:", error);
                    });
            }
        });
    };

    return (
        <div>
            <PostNavigationButton handleClick={handlePostNavClick} />
            <div className='mx_30'>
                <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
                <br />
                {/* 검색창 */}
                <Input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="게시글 제목을 입력해주세요"
                    className="form-control mb-3 fs_16 fw_900"
                    style={{
                        height: '40px',
                        padding: '8px',
                        borderBottom: '1px solid #5279FD',
                        borderRadius: '0',
                        border: 'none',
                    }}
                    startAdornment={
                        <>
                            {searchQuery && (
                                <InputAdornment position="start">
                                    {/* IconButton 추가 */}
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
                /><br /><br />
                <div className="fs_17 fw_800">
                    <span className="col_blue2">{member.nickname}</span> 님의 게시글 목록
                </div>
                {filteredBoard.length === 0 ? (
                    <div className="fs_14" style={{ marginTop: '10px' }}>
                        작성한 게시글이 없습니다.
                    </div>
                ) : (
                    currentItems.map((item, index) => (
                        <div
                            key={index}
                            className='bor_gray1 px-3 py-2 mt_10'
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                                borderRadius: "10px",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div
                                    onClick={() => nav(`/board/detail/${item.boardcode}`)}
                                    style={{
                                        cursor: "pointer",
                                        width: "90%",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    <span className='fw_600'>{item.title}</span>
                                </div>
                                <button
                                    onClick={() => deletePost(item.boardcode)}
                                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: 'gray' }}
                                >
                                    삭제
                                </button>
                            </div>
                            <div className='fs_14'>{item.registereddate}</div>
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
        </div>
    );
}

export default MyBoardMain;
