import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatListTable = ({ list, showLength }) => {
    const nav = useNavigate();

    return (
        <div className="table-container mt_45" style={{ overflowY: 'hidden' }}>
            <table className='chatlog-table'>
                <thead>
                    <tr>
                        <th width='50' style={{ backgroundColor: 'var(--cobaltblue)' }}>번호</th>
                        <th width='171' style={{ backgroundColor: 'var(--cobaltblue)' }}>날짜</th>
                        <th width='112' style={{ backgroundColor: 'var(--cobaltblue)' }}>상담사</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 테이블 내용 */}
                    {
                        list.slice(0, showLength).map((data, index) => (
                            <tr key={index}
                                onClick={() => nav("../logcontent?roomcode=" + data.chatroomcode)}>
                                <td>{index + 1}</td>
                                <td>{data.date ? (
                                    <span>
                                        {data.datePieces.day}&nbsp;
                                        <span className='col_blue2'>{data.datePieces.dayOfWeek}</span>&nbsp;
                                        {data.datePieces.time}
                                    </span>
                                ) : '요약본 미발급'}</td>
                                <td>
                                    {/* <img alt={data.counselorname} src={data.counselorphoto}
                                        width={20} height={20} /> */}
                                    {data.counselorname}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ChatListTable;