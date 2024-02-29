import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Pagination, InputAdornment, Input, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ViewListFilter from './ViewListFilter';
import PageHeader from '../../PageHeader';

const MemberManage = () => {
    const CURRENT_ROUTES = [
        { name: '관리자 홈', url: '/admin' },
        { name: '회원 관리', url: '' }
    ];
    const PAGE_TITLE = "회원 관리";

    const [dateOrderAsc, setDateOrderAsc] = useState(false); // 내림차순으로 변경
    const [listDisplay, setListDisplay] = useState([]); // 화면에 보여줄 리스트 배열
    const nav = useNavigate();
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [membersPerPage] = useState(10);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.post("/admin/memberlist");
                setMembers(response.data.user);
                setListDisplay(getSortedArrayByDate(response.data.user, -1)); // 내림차순으로 정렬
            } catch (error) {
                console.error('회원 목록 불러오기 실패:', error.message);
            }
        };

        fetchMembers();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setCurrentPage(1);
    };

    //날짜순 정렬
    const handleDateOrderClick = () => {
        setDateOrderAsc(!dateOrderAsc);
    }
    // 날짜순 정렬 기준이 변경될 때마다 display를 변경해준다
    useEffect(() => {
        const NUM_FOR_SORT = (dateOrderAsc) ? 1 : -1;
        let newDisplay = getSortedArrayByDate(listDisplay, NUM_FOR_SORT);
        setListDisplay(newDisplay); // 정렬된 새 배열로 디스플레이 설정
    }, [dateOrderAsc]);

    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = listDisplay // listDisplay로 변경
        .filter(member => member.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
        .slice(indexOfFirstMember, indexOfLastMember);

    const totalPages = Math.ceil(listDisplay.length / membersPerPage); // listDisplay로 변경

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            {/* 검색창 */}
            <Input
                type="text"
                placeholder="회원 닉네임을 입력해주세요"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control mb-3 fs_16 fw_900 mt_25"
                style={{
                    height: '40px',
                    padding: '8px',
                    borderBottom: '1px solid #D4E4F2',
                    borderRadius: '0',
                    border: 'none', // 이 부분을 추가하여 기본 border를 제거
                }}
                endAdornment={
                    <InputAdornment position="end">
                        {searchTerm && (
                            <IconButton onClick={clearSearch}>
                                <ClearIcon />
                            </IconButton>
                        )}
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
            />
            <br /><br />
            <div className='input-group' style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h6 className='fs_16 fw_800' style={{ marginTop: 'auto' }}>회원 목록</h6>
                <ViewListFilter dateOrderAsc={dateOrderAsc} handleDateOrderClick={handleDateOrderClick} style={{ marginTop: '-5px' }} />
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>닉네임</th>
                        <th>가입 날짜</th>
                    </tr>
                </thead>
                <tbody className='bg_red'>
                    {currentMembers.map((member, index) => (
                        <tr
                            key={index}
                            onClick={() => nav("MemberProfile?usercode=" + member.usercode)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{index + 1 + indexOfFirstMember}</td>
                            <td>{member.nickname}</td>
                            <td>{member.registereddate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination */}
            <div className="justify-content-center d-flex mt-3 qnaPage_btn">
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    shape="rounded"
                    variant="outlined"
                    color="primary"
                    hidePrevButton
                    hideNextButton
                    hideFirstButton
                    hideLastButton
                />
            </div>
        </div>
    );
};
// 데이터를 날짜 순으로 오름차순/내림차순 정렬하여 반환하는 함수
function getSortedArrayByDate(data, direction = 1) {
    let sortedArray = [...data];

    sortedArray.sort((a, b) => {
        if (a && b) {
            return (new Date(a.registereddate) - new Date(b.registereddate)) * direction;
        }
    });

    return sortedArray;
}

export default MemberManage;
