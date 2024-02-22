import React from 'react';
import defaultPhoto from '../../../image/default_profile_photo_blue.jpg';

const STORAGE_PHOTO_BASE = 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/counselors/';

const CounselorCardFront = ({ bgcolor, data }) => {
    return (
        <div className='counselorcard card-front' style={{ backgroundColor: bgcolor }}>
            <div className='cardheader fs_22 fw_800'>OFFICIAL</div>
            <br />
            <img alt='상담사' src={data.photo ? STORAGE_PHOTO_BASE + data.photo : defaultPhoto}
                className='counselorphoto frontphoto' />
            <br />
            <div className='fs_24 fw_800'><span className='fw_900 fs_28'>{data.name}</span> 상담사</div>
            <div className='fs_16 fw_600'>{data.briefintro}</div>
        </div>
    );
};

export default CounselorCardFront;