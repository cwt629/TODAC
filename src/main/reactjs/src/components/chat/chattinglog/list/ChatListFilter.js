import React from 'react';

const ChatListFilter = ({ dateOrderAsc, handleDateOrderClick, counselor, filterList, handleCounselorSelect }) => {
    return (
        <div className='chatlistfilter mt_25' style={{ justifyContent: 'right', alignItems: 'center' }}>
            <div className='fs_10 fw_700'>정렬 기준</div>
            &emsp;

            <button className='white short pressable chat-date'
                onClick={handleDateOrderClick}>
                날짜순 <span className={`chat-arrow ${dateOrderAsc ? '' : 'chat-arrow-down'}`}>↑</span>
            </button>&emsp;

            <div className='dropdown-center'>
                <button className='dropdown-toggle white pressable' type='button' data-bs-toggle="dropdown">
                    상담사 : {counselor}
                </button>
                <ul className='dropdown-menu'
                    style={{ marginTop: '6px' }}>
                    {
                        filterList.map((item, idx) => (
                            <li key={idx} value={item} onClick={() => handleCounselorSelect(item)}>
                                <a className={`dropdown-item ${idx === 0 ? 'fw_600' : ''}`} href='#'
                                    style={{ color: (item === counselor) ? 'var(--deepblue)' : 'var(--mainblack)' }}>{item}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
};

export default ChatListFilter;