import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios";

const MemberComments = () => {

    // const [comment, setComment] = useState([]);
    // let [query, setQuery] = useSearchParams();
    // const usercode = query.get("usercode");

    // const getComment = () => {
    //     console.log("usercode = " + usercode);
    //     axios.post("/admin/member/comment?usercode=" + usercode)
    //         .then(res => {
    //             console.log(res.data);
    //             setComment(res.data);
    //         })
    // }

    // useEffect(() => {
    //     getComment();
    // }, [usercode]);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberComments" className='col_blue2'>회원 댓글</Link>
            </div>
            <div className='fs_25 fw_700'>회원 댓글</div>
            {/* <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>내용</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {comment.map((item, index) => (
                        <tr key={index}>
                            <td>{item.content}</td>
                            <td>{item.registereddate}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
};

export default MemberComments;