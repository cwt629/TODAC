import React from 'react';
import filledStar from '../../../image/star_filled.png'
import emptyStar from '../../../image/star_empty.png'

const ChatReviewModal = ({ star, maxStar }) => {
    return (
        <div>
            만족하셨다면 별점을 남겨주세요 :{')'}
            <div className='review-stars'>
                {
                    Array.from({ length: maxStar }, () => 0).map((item, index) => (
                        <span className='review-star' key={index}>
                            <img alt='별' src={(index < star) ? filledStar : emptyStar} />
                        </span>
                    ))
                }
            </div>
            <div className='review-buttons'>
                <div className='review-button bg_red review-pass'>건너뛰기</div>
                <div className='review-button bg_red review-grant'>별점 주기</div>
                <div className='review-button bg_red review-close'>닫기</div>
            </div>
        </div>
    );
};

export default ChatReviewModal;