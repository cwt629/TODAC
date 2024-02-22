import React, { useState } from 'react';
import CounselorCard from './CounselorCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

const CounselorOptions = ({ info, handleClick }) => {
    const [flip, setFlip] = useState(false);

    const handleCardClick = (e) => {
        setFlip(!flip);
        console.log(e.currentTarget);
        e.currentTarget.classList.toggle('counselor-card-flipped');
    }

    return (
        <div className='counseloroptions mt_25'>
            {/* {
                info.map((data, idx) => (
                    <CounselorCard key={idx} idx={idx} info={data} handleClick={handleClick} />
                ))
            } */}
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
            >
                <SwiperSlide onClick={(e) => handleCardClick(e)}>
                    <div className='counselorcard card-front'>앞</div>
                    <div className='counselorcard card-back'>뒤</div>
                </SwiperSlide>
                <SwiperSlide onClick={(e) => handleCardClick(e)}>
                    <div className='counselorcard card-front'>앞2</div>
                    <div className='counselorcard card-back'>뒤2</div>
                </SwiperSlide>
                <SwiperSlide onClick={(e) => handleCardClick(e)}>
                    <div className='counselorcard card-front'>앞2</div>
                    <div className='counselorcard card-back'>뒤2</div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CounselorOptions;