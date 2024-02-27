import React from 'react';
import defaultPhoto from '../../../../image/default_profile_photo_blue.jpg';
import starIcon from '../../../../image/rotating_star.gif';

const CounselorPreviewBack = ({ data }) => {
    return (
        <div className='counselorcard card-back'
            style={{ backgroundColor: data.cardcolor }}>
            <div className='fw_600 fs_24'>Counselor Info</div>
            <div className='mt_10 profile-simple'>
                <img alt='상담사' src={data.photo ? data.photo : defaultPhoto}
                    className='counselorphoto backphoto' />
                <div>
                    <div className='fw_600 fs_20' style={{ textAlign: 'left' }}>{data.name ? data.name : '이름'}</div>
                    <div className='fw_400 fs_16'
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <img alt='별' src={starIcon} width={17} height={17} />
                        &nbsp;0.0 (0)
                    </div>
                </div>
            </div>
            <div className='mt_10' style={{ overflowY: 'auto', width: '100%', textAlign: 'left' }}>
                {
                    data.introduction ?
                        data.introduction.split("\n").map((line, i) => (
                            <div key={i}>
                                {line}
                                {i !== data.introduction.split('\n').length - 1 && <br />}
                            </div>
                        ))
                        : '상담사에 대한 소개'
                }
            </div>
            <div className='mt_10'>
                <button type='button' className='counselinnerbtn officialbtn btn-jittery fw_600'>상담 시작!</button>
            </div>
        </div>
    );
};

export default CounselorPreviewBack;