import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import CounselorCardFront from './CounselorCardFront';
import CounselorCardBack from './CounselorCardBack';
import CounselorCardLast from './CounselorCardLast';

const CARD_COLORS = [
    "#D4F0F0", // 토닥봇
    "#FFD09E", // 설리반
    "#FED7C3", // 금공감
    "#ECD5E3", // 너티야
    "#FEE1E8", // 키키
    "#C6DBDA" // 츤데레
];

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
                <SwiperSlide>
                    <CounselorCardLast />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CounselorOptions;