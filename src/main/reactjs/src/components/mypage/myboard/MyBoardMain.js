import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import { Pagination, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MyBoardMain = () => {
    const nav = useNavigate();
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const usercode = sessionStorage.getItem("usercode");
    const [member, setMember] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);

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

    // SweetAlert2 모달 창
    const openModal = (post) => {
        Swal.fire({
            title: post.title,
            imageUrl: `<div>${post.photo}</div>`,
            html: `<div>${post.content}</div>`,
            confirmButtonColor: '#FF7170',
            confirmButtonText: '닫기',
        });
    };

    // 게시글 삭제
    const deletePost = (boardcode) => {
        Swal.fire({
            title: '게시글 삭제',
            text: '해당 게시글을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF7170',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/post/delete?boardcode=${boardcode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 삭제 후 다시 게시글 목록을 불러옴
                        fetchBoard(usercode);
                        Swal.fire({
                            title: '삭제 완료',
                            text: '게시글이 성공적으로 삭제되었습니다.',
                            icon: 'success',
                            confirmButtonColor: '#FF7170',
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
                <Link to="/user" className='col_blue2'>마이 홈 {'>'} </Link>
                <Link to="/user/myboard" className='col_blue2'>게시글 </Link>
            </div>
            <div className='fs_25 fw_700'>회원 게시글</div> <br />
            {/* 검색창 */}
            <OutlinedInput
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="타입을 검색하세요"
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
            <div className="fs_17 fw_800">{member.nickname} 님의 게시글 목록</div>
            {currentItems.map((item, index) => (
                <div key={index} className="bg_gray bor_gray1 px-3 py-2" style={{ borderRadius: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                            onClick={() => openModal(item)}
                            style={{ cursor: 'pointer', width: '90%', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                        >
                            <span className="fw_600">{item.title}</span>
                        </div>
                        <button onClick={() => deletePost(item.boardcode)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            삭제
                        </button>
                    </div>
                    <div className="fs_14">{item.registereddate}</div>
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

export default MyBoardMain;