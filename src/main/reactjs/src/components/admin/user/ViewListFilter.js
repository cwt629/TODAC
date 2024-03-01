import React from 'react';
import "../../chat/chattinglog/ChattingLogStyle.css";

const ViewListFilter = ({ dateOrderAsc, handleDateOrderClick }) => {
    return (
        <div className='chatlistfilter' style={{ justifyContent: 'right', alignItems: 'center', marginRight: '4px' }}>
            <button className='white short pressable chat-date'
                onClick={handleDateOrderClick}>
                날짜순 <span className={`chat-arrow ${dateOrderAsc ? '' : 'chat-arrow-down'}`}>↑</span>
            </button>

        </div>
    );
};

export default ViewListFilter;