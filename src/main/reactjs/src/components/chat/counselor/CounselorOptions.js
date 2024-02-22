import React, { useState } from 'react';
import CounselorCard from './CounselorCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import CounselorCardFront from './CounselorCardFront';
import CounselorCardBack from './CounselorCardBack';

const CARD_COLORS = ["rgb(174, 227, 227)", "rgb(249, 211, 142)", "rgb(189 136 130)", "rgb(179 113 191)"
    , "rgb(243 179 162)", "rgb(178 188 223)"];

const CounselorOptions = ({ info, handleCounselClick }) => {
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
                {
                    info.map((data, idx) => (
                        <SwiperSlide key={idx} onClick={(e) => handleCardClick(e)}>
                            <CounselorCardFront bgcolor={CARD_COLORS[idx % CARD_COLORS.length]} data={data} />
                            <CounselorCardBack borcolor={CARD_COLORS[idx % CARD_COLORS.length]} data={data}
                                handleCounselClick={handleCounselClick} />
                        </SwiperSlide>
                    ))

                }

            </Swiper>
        </div>
    );
};

export default CounselorOptions;