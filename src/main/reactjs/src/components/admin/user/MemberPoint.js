import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";

const MemberPoint = () => {
    const nav = useNavigate();
    const [point, setPoint] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const usercode = params.get("usercode");
    const [member, setMember] = useState([]);

    useEffect(() => {
        if (usercode) {
            getMember(usercode);
            fetchPoint(usercode);
        }
    }, [usercode]);

    const getMember = () => {
        const url = "/member/data?usercode=" + usercode;
        axios.post(url, {})
            .then(res => {
                setMember(res.data);
            })
    }

    const fetchPoint = (usercode) => {
        setLoading(true);
        axios.post(`/admin/payment?usercode=${usercode}`)
            .then(res => {
                setPoint(res.data);
            })
            .catch(error => {
                console.error("Error fetching comment:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // 검색어와 일치하는 게시글만 필터링
    const filteredPoint = point.filter(item => item.type.includes(searchQuery));

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원 관리 {'>'} </Link>
                <Link to="/admin/MemberManage/MemberProfile" className='col_blue2'>회원 정보 {'>'}</Link>
                <Link to="/admin/MemberManage/MemberProfile/MemberPoint" className='col_blue2'>회원 포인트 사용내역</Link>
            </div>
            <div className='fs_25 fw_700'>회원 포인트 사용 내역</div>

            <div style={{ textAlign: 'center' }}>
                <img alt='' src={member.photo} style={{ width: '25vh', height: '25vh' }} />
                <br /><br />
                <h1 className='fs_25 fw_700'>{member.nickname}님</h1>
                <br />
            </div>
            <div className='fs_17 fw_800'>{member.nickname} 님의 포인트 사용내역 검색</div>

            {/* 검색창 */}
            <input
                type="text"
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="타입을 검색하세요"
                className="form-control mb-3 bg_red col_gray fs_16 fw_800"
                style={{ '::placeholder': { color: 'lightgray' } }}
            />
            <div className="fs_17 fw_800">{member.nickname} 님의 포인트 사용내역</div>
            {filteredPoint.map((item, index) => (
                <div key={index} className="bg_gray bor_gray1 px-3 py-2">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <span className="fw_600">{item.applieddate}</span> &ensp;
                            <span className="fw_600">{item.type}</span>
                        </div>
                    </div>
                    <div className="fs_14">{item.recordcode}</div>
                </div>
            ))}

        </div>
    );
};

export default MemberPoint;