import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";

const MemberPost = () => {
    const nav = useNavigate();
    const [board, setBoard] = useState([]);
    let [query, setQuery] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const usercode = query.get("usercode");


    const getBoard = () => {
        axios.post("/admin/member/post?usercode=" + usercode)
            .then(res => {
                setBoard(res.data);
            })
    }

    useEffect(() => {
        console.log("usercode : " + usercode);
        getBoard();
    }, [usercode, searchQuery]);

    // 검색어와 일치하는 게시글만 필터링합니다.
    const filteredBoard = board.filter(item => item.title.includes(searchQuery));

    const goMemberManage = () => {
        console.log(usercode);
        nav("/admin/MemberManage/MemberProfile?usercode=" + usercode);
    }

    return (
        < div className='mx_30' >
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to={goMemberManage} className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberPost" className='col_blue2'>회원 게시글</Link>
            </div>
            <div className='fs_25 fw_700'>회원 게시글</div>

            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="search" className='fs_16 fw_600 col_blue2'>검색:</label>
                <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="게시글 제목을 검색하세요"
                    className='commonInput fs_16 fw_600'
                />
            </div>

            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBoard.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
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
        </div >
    );
};

export default MemberPost;