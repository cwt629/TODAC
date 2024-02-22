import React from 'react';

const ChatListFilter = ({ dateOrderAsc, handleDateOrderClick, counselor, filterList, handleCounselorSelect }) => {
    return (
        <div className='chatlistfilter mt_25' style={{ justifyContent: 'right', alignItems: 'center' }}>
            <div className='fs_10 fw_700'>정렬 기준</div>
            &emsp;

            <button className='bor_red bg_red br_5 chat-date'
                onClick={handleDateOrderClick}>
                날짜순 <span className={`chat-arrow ${dateOrderAsc ? '' : 'chat-arrow-down'}`}>↑</span>
            </button>&emsp;
            {/* <select onChange={handleCounselorSelect} value={counselor} className='selectCounselor fs_14 bor_red bg_red mt_10'>
                    <option value="" disabled hidden>선택</option>
                    {
                        filterList.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))
                    }
                </select> */}
            <div className='dropdown-center'>
                <button className='dropdown-toggle bg_red bor_red br_5' type='button' data-bs-toggle="dropdown">
                    상담사 : {counselor}
                </button>
                <ul className='dropdown-menu bg_red bor_red'>
                    {
                        filterList.map((item, idx) => (
                            <li key={idx} value={item} onClick={() => handleCounselorSelect(item)}>
                                <a className={`dropdown-item ${idx === 0 ? 'fw_600' : ''}`} href='#'>{item}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    );
};

export default ChatListFilter;