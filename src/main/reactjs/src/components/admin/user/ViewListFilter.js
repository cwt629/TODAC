import React from 'react';
import "../../chat/chattinglog/ChattingLogStyle.css";

const ViewListFilter = ({ dateOrderAsc, handleDateOrderClick }) => {
    return (
        <div className='chatlistfilter' style={{ justifyContent: 'right', alignItems: 'center' }}>
            <button className='white short pressable chat-date'
                onClick={handleDateOrderClick}>
                날짜순 <span className={`chat-arrow ${dateOrderAsc ? '' : 'chat-arrow-down'}`}>↑</span>
            </button>&emsp;

        </div>
    );
};

export default ViewListFilter;