import React from 'react';

const ChatListFilter = ({ dateOrderAsc, handleDateOrderClick, counselor, filterList, handleCounselorSelect }) => {
    return (
        <div className='input-group mt_25' style={{ justifyContent: 'right', alignItems: 'center' }}>
            <div className='fs_10 fw_700'>정렬 기준</div>
            &emsp;
            <div>
                <button className='bor_red bg_red br_5 chat-date'
                    onClick={handleDateOrderClick}>
                    날짜순 <span className={`chat-arrow ${dateOrderAsc ? '' : 'chat-arrow-down'}`}>↑</span>
                </button>&emsp;
                <select onChange={handleCounselorSelect} value={counselor} className='selectCounselor fs_14 bor_red bg_red mt_10'>
                    <option value="" disabled hidden>선택</option>
                    {
                        filterList.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    );
};

export default ChatListFilter;