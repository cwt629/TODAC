import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios";

const MemberComments = () => {

    const [comment, setComment] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    let [query, setQuery] = useSearchParams();
    const usercode = query.get("usercode");

    const getComment = () => {
        axios.get("/admin/member/comment?usercode=" + usercode)
            .then(res => {
                setComment(res.data);
            })
    }

    useEffect(() => {
        getComment();
    }, [usercode, searchQuery]);

    // 검색어와 일치하는 게시글만 필터링합니다.
    const filteredBoard = comment.filter(item => item.content.includes(searchQuery));

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberComments" className='col_blue2'>회원 댓글</Link>
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
                    {filteredBoard.map((item, index) => (
                        <tr key={index}>
                            <td>{item.content}</td>
                            <td>{item.registereddate}</td>
                        </tr>
                    ))}
                    {filteredBoard.length === 0 && (
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