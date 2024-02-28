import React from 'react';
import filledStar from '../../../image/star_filled_narrow.png'
import emptyStar from '../../../image/star_empty_narrow.png'

const ChatReviewModal = ({ star, maxStar, counselorname, handleStarClick, handleReviewPass, handleReviewGrant, handleReviewClose }) => {
    return (
        <div>
            <span className='col_blue2'>{counselorname ? counselorname : '이'}</span> 상담사에게 별점을 남겨주세요 :{')'}
            <div className='review-stars'>
                {
                    Array.from({ length: maxStar }, () => 0).map((item, index) => (
                        <span className='review-star' key={index} onClick={() => handleStarClick(index)}>
                            <img alt='별' src={(index < star) ? filledStar : emptyStar} />
                        </span>
                    ))
                }
            </div>
            <div className='review-buttons'>
                <div className='review-button review-pass' onClick={() => handleReviewPass()}>건너뛰기</div>
                <div className='review-button review-grant' onClick={() => handleReviewGrant()}>별점 주기</div>
                <div className='review-button review-close' onClick={() => handleReviewClose()}>닫기</div>
            </div>
        </div >
    );
};

export default ChatReviewModal;