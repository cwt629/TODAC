import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const MemberComments = () => {
    const nav = useNavigate();
    const [comment, setComment] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");

    useEffect(() => {
        if (usercode) {
            fetchComment(usercode);
        }
    }, [usercode]);

    const fetchComment = (usercode) => {
        setLoading(true);
        axios.get(`/admin/member/comment?usercode=${usercode}`)
            .then(res => {
                setComment(res.data);
            })
            .catch(error => {
                console.error("Error fetching comment:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // 검색어와 일치하는 게시글만 필터링
    const filteredComment = comment.filter(item => item.content.includes(searchQuery));

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to={`/admin/MemberManage/MemberProfile?usercode=${usercode}`} className='col_blue2'>회원 정보 {'>'}</Link>
                <span className='col_blue2'>&nbsp;회원 댓글</span>
            </div>
            <div className='fs_25 fw_700'>회원 댓글</div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="search" className='fs_16 fw_600 col_blue2'>검색:</label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="댓글 내용을 검색하세요"
                    className='commonInput fs_16 fw_600'
                />
            </div>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>내용</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComment.map((item, index) => (
                        <tr key={index}>
                            <td>{item.content}</td>
                            <td>{item.registereddate}</td>
                        </tr>
                    ))}
                    {filteredComment.length === 0 && (
                        <tr>
                            <td colSpan="2">검색 결과가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default MemberComments;