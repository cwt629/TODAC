import React from 'react';

const ChatReviewModal = () => {
    return (
        <div>
            만족하셨다면 별점을 남겨주세요 :{')'}
            <div className='review-buttons'>
                <div className='review-button bg_red review-pass'>건너뛰기</div>
                <div className='review-button bg_red review-grant'>별점 주기</div>
                <div className='review-button bg_red review-close'>닫기</div>
            </div>
        </div>
    );
};

export default ChatReviewModal;