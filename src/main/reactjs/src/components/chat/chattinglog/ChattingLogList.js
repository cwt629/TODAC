import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChattingLogStyle.css';

const ChattingLogList = () => {
    const SORT_FILTERS = ["최신순", "1번 상담사", "2번 상담사", "3번 상담사", "4번 상담사", "5번 상담사", "6번 상담사"];
    const [filter, setFilter] = useState("");
    const [showMore, setShowMore] = useState(false);
    const tableRef = useRef(null);

    const handleFilterSelect = (e) => {
        setFilter(e.target.value);
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/loglist" className='col_blue2'>상담기록</Link>
            </div>
            <div className='fs_25 fw_700'>나의 상담기록</div>

            <br />

            <div className='input-group' style={{ justifyContent: 'right', alignItems: 'center' }}>
                <div className='fs_10 fw_700'>정렬 기준</div>
                &emsp;
                <div>
                    <select onChange={handleFilterSelect} value={filter} className='selectCounselor fs_14 bor_red bg_red mt_10'>
                        <option value="" disabled hidden>선택</option>
                        {
                            SORT_FILTERS.map((item) => (
                                <option value={item} key={item}>
                                    {item}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <br /><br />

            {/* 로그 테이블 출력 */}
            <div className="table-container" style={{ maxHeight: showMore ? 'none' : '652px', overflowY: 'hidden' }}>
                <table className='table table-bordered' ref={tableRef}>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>날짜</th>
                            <th>상담사</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>2024.02.07</td>
                            <td>상담사</td>
                        </tr>
                    </thead>
                    <tbody className='bg_red'>
                        {/* 테이블 내용 */}
                    </tbody>
                </table>
            </div>

            <br /><br />

            <div style={{ textAlign: 'center' }}>
                <button onClick={handleShowMore} className='btn bor_blue1 bg_blue' style={{ color: '#536179' }}>
                    {showMore ? '간략히 보기' : '더 보기'}
                </button>
            </div>
        </div >
    );
};

export default ChattingLogList;
