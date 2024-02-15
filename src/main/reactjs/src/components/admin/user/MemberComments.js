import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';
import { Pagination, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MemberComments = () => {
    const nav = useNavigate();
    const [comment, setComment] = useState([]);
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
            fetchComment(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const fetchComment = (usercode) => {
        setLoading(true);
        axios.post(`/admin/member/comment?usercode=${usercode}`)
            .then(res => {
                setComment(res.data);
            })
            .catch(error => {
                console.error("댓글을 불러오는 중 오류 발생:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 검색어와 일치하는 댓글만 필터링
    const filteredComment = comment.filter(item => item.content.includes(searchQuery));

    // 페이징을 위한 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredComment.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredComment.length / itemsPerPage);

    // SweetAlert2 모달 창 
    const deleteComment = (commentcode) => {
        Swal.fire({
            title: '댓글 삭제',
            text: '해당 댓글을 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FF7170',
            confirmButtonText: '예',
            cancelButtonText: '아니오',
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `/comment/delete?commentcode=${commentcode}`;
                axios
                    .delete(url)
                    .then(() => {
                        // 삭제 후 다시 댓글 목록을 불러옴
                        fetchComment(usercode);
                        Swal.fire({
                            title: '삭제 완료',
                            text: '댓글이 성공적으로 삭제되었습니다.',
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
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to={`/admin/MemberManage/MemberProfile?usercode=${usercode}`} className='col_blue2'>회원 정보 {'>'}</Link>
                <span className='col_blue2'>&nbsp;회원 댓글</span>
            </div>
            <div className='fs_25 fw_700'>회원 댓글</div> <br />

            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '25vh', height: '25vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>
            <div className='fs_17 fw_800'>{member.nickname} 님의 댓글 검색</div>

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
            <div className="fs_17 fw_800">{member.nickname} 님의 댓글 목록</div>
            {currentItems.map((item, index) => (
                <div key={index} className="bg_gray bor_gray1 px-3 py-2" style={{ borderRadius: '5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span className="fw_600">{item.content}</span>
                        </div>
                        <button onClick={() => deleteComment(item.commentcode)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
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

export default MemberComments;