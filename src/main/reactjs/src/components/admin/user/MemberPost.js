import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const MemberPost = () => {
    const nav = useNavigate();
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const [member, setMember] = useState([]);

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchBoard(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        console.log("usercode = " + usercode);
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
                console.error("Error fetching board:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // 검색어와 일치하는 게시글만 필터링
    const filteredBoard = board.filter(item => item.title.includes(searchQuery));

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to={`/admin/MemberManage/MemberProfile?usercode=${usercode}`} className='col_blue2'>회원 정보 {'>'}</Link>
                <span className='col_blue2'>&nbsp;회원 게시글</span>
            </div>
            <div className='fs_25 fw_700'>회원 게시글</div>

            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '25vh', height: '25vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>

            {/* 검색창 */}
            <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="게시글 제목을 검색하세요"
                className="form-control mb-3 bg_red col_gray fs_16 fw_800"
                style={{ '::placeholder': { color: 'lightgray' } }}
            />

            {filteredBoard.map((item, index) => (
                <div key={index} className='bg_gray bor_gray1 px-3 py-2'>
                    <div>제목 : <span className='fw_600'>{item.title}</span></div>
                    <div className='fs_14'>{item.registereddate}</div>
                </div>
            ))}
        </div>
    );
};

export default MemberPost;
