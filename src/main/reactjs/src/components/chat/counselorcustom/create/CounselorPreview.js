import React from 'react';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CounselorPreviewBack from './CounselorPreviewBack';
import CounselorPreviewFront from './CounselorPreviewFront';

const CounselorPreview = ({ data }) => {
    const handleCardClick = (e) => {
        e.currentTarget.classList.toggle("counselor-card-flipped");
    };

    return (
        <div>
            <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className='mySwiper'>
                <SwiperSlide onClick={(e) => handleCardClick(e)}>
                    <CounselorPreviewFront data={data} />
                    <CounselorPreviewBack data={data} />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CounselorPreview;