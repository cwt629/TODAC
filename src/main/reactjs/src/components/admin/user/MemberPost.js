import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios";

const MemberPost = () => {

    const [board, setBoard] = useState([]);
    let [query, setQuery] = useSearchParams();
    const usercode = query.get("usercode");

    useEffect(() => {
        getBoard();
    }, [usercode]);

    const getBoard = () => {
        const url = "/admin/member/post?usercode=" + usercode;
        console.log("usercode = " + usercode);
        axios.post(url, {})
            .then(res => {
                setBoard(res.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        < div className='mx_30' >
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberPost" className='col_blue2'>회원 게시글</Link>
            </div>
            <div className='fs_25 fw_700'>회원 게시글</div>
            {/* Display posts */}
            <table className='boardpost'>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {board.map(board => (
                        <tr key={board.usercode}>
                            <td>{board.title}</td>
                            <td>{board.registereddate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default MemberPost;