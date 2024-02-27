import React from 'react';
import defaultPhoto from '../../../../image/default_profile_photo_blue.jpg';

const CounselorPreviewFront = ({ data }) => {
    return (
        <div className='counselorcard card-front' style={{ backgroundColor: data.cardcolor }}>
            <div className='cardheader fs_22 fw_800'>CUSTOM</div>
            <br />
            <img alt='상담사' src={data.photo ? data.photo : defaultPhoto}
                className='counselorphoto frontphoto' />
            <br />
            <div className='fs_24 fw_800'><span className='fw_900 fs_28'>{data.name ? data.name : '어느'}</span> 상담사</div>
            <div className='fs_16 fw_600'>{data.briefintro ? data.briefintro : '짧은 설명'}</div>
        </div>
    );
};

export default CounselorPreviewFront;