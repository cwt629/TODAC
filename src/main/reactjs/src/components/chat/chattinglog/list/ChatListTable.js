import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatListTable = ({ list, showMore }) => {
    const nav = useNavigate();

    return (
        <div className="table-container mt_45" style={{ maxHeight: showMore ? 'none' : '652px', overflowY: 'hidden' }}>
            <table className='chatlog-table'>
                <thead>
                    <tr>
                        <th width='50' style={{ backgroundColor: '#F9EAEB' }}>번호</th>
                        <th width='171' style={{ backgroundColor: '#F9EAEB' }}>날짜</th>
                        <th width='112' style={{ backgroundColor: '#F9EAEB' }}>상담사</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 테이블 내용 */}
                    {
                        list.map((data, index) => (
                            <tr key={index}
                                onClick={() => nav("../logcontent?roomcode=" + data.chatroomcode)}>
                                <td>{index + 1}</td>
                                <td>{data.date ? (
                                    <span>
                                        {data.datePieces.day}&nbsp;
                                        <span className='col_red'>{data.datePieces.dayOfWeek}</span>&nbsp;
                                        {data.datePieces.time}
                                    </span>
                                ) : '요약본 미발급'}</td>
                                <td>{data.counselorname}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ChatListTable;