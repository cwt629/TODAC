import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MemberManage = () => {
    const nav = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.post("/admin/memberlist");
                setMembers(response.data.user);
            } catch (error) {
                console.error('회원 목록 불러오기 실패:', error.message);
            }
        };

        fetchMembers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    /* toLowerCase(): 대소문자에 관계없이 일치 여부를 확인할 수 있음 */
    const filteredMembers = members.filter(member =>
        member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/admin" className='col_blue2'>관리자 홈 {'>'} </Link>
                <Link to="/admin/MemberManage" className='col_blue2'>회원관리</Link>
            </div>
            <div className='fs_25 fw_700'>회원 관리</div>

            <h6>회원 검색</h6>

            {/* 검색창 */}
            <input
                type="text"
                placeholder="닉네임 검색"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control mb-3"
            />

            <h6>회원 목록</h6>
            <table className='table'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>닉네임</th>
                        <th>가입 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMembers.map(member => (
                        <tr
                            key={member.usercode}
                            onClick={() => nav(`MemberProfile`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{member.usercode}</td>
                            <td>{member.nickname}</td>
                            <td>{member.registereddate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MemberManage;
