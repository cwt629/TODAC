import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import { Pagination, InputAdornment, IconButton, Input } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const MemberPost = () => {
    const nav = useNavigate();
    const [board, setBoard] = useState([]);
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
            fetchBoard(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const fetchBoard = (usercode) => {
        setLoading(true);
        axios.post(`/admin/member/post?usercode=${usercode}`)
            .then(res => {
                setBoard(res.data);
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

    // 검색어와 일치하는 게시글만 필터링
    const filteredBoard = board.filter(item => item.title.includes(searchQuery));

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBoard.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredBoard.length / itemsPerPage);

    // 게시글 삭제
    const deletePost = (boardcode) => {
        Swal.fire({
            title: '게시글 삭제',
            text: '해당 게시글을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5279FD',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/post/delete?boardcode=${boardcode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 삭제 후 MemberPost 페이지로 이동
                        fetchBoard(usercode);
                        Swal.fire({
                            title: '삭제 완료',
                            text: '게시글이 성공적으로 삭제되었습니다.',
                            icon: 'success',
                            confirmButtonColor: '#5279FD',
                        }).then(() => {
                            nav(`/admin/MemberManage/MemberProfile/MemberPost?usercode=` + member.usercode);
                        });
                    })
                    .catch((error) => {
                        console.error('삭제 중 오류 발생:', error);
                    });
            }
        });
    };


    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to={`/admin/MemberManage/MemberProfile?usercode=${usercode}`} className='col_blue2'>회원 정보 {'>'}</Link>
                <span className='col_blue2'>&nbsp;회원 게시글</span>
            </div>
            <div className='fs_25 fw_700'>회원 게시글</div> <br />

            <div className='fs_25 fw_700' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img alt='' src={member.photo} style={{ width: '15vh', height: '15vh', borderRadius: '50%' }} />
                    <span className='fs_22 fw_700 mt-2'>{member.nickname}님</span>
                </div>
            </div>
            <br />
            {/* <div className='fs_17 fw_800'>{member.nickname} 님의 게시글 검색</div> */}
            <Input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색할 게시글 제목을 입력하세요"
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
                <span className="col_blue2">{member.nickname}</span> 님의 게시글 목록
            </div>
            {filteredBoard.length === 0 ? (
                <div className="fs_14" style={{ marginTop: '10px' }}>
                    작성한 게시글이 없습니다.
                </div>
            ) : (
                currentItems.map((item, index) => (
                    <div key={index} className="bg_gray bor_gray1 px-3 py-2">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <span className="fw_600"
                                    onClick={() => nav(`/admin/MemberManage/MemberProfile/MemberPost/MemberPostDetail?usercode=${usercode}&boardcode=${item.boardcode}`)}>{item.title}</span>
                            </div>
                            <button onClick={() => deletePost(item.boardcode)}
                                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: 'gray' }}>
                                삭제
                            </button>
                        </div>
                        <div className="fs_14">{item.registereddate}</div>
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

export default MemberPost;