import React from 'react';
import defaultPhoto from '../../../image/default_profile_photo_blue.jpg';
import starIcon from '../../../image/rotating_star.gif';
import { ClearRounded, HighlightOffRounded } from '@mui/icons-material';

const STORAGE_PHOTO_BASE = 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/counselors/';


const CounselorCardBack = ({ borcolor, data, handleCounselClick, handleCounselorDelete }) => {
    return (
        <div className='counselorcard card-back'
            style={{ backgroundColor: borcolor }}>
            <div className='fw_600 fs_24'>Counselor Info</div>
            <div className='mt_10 profile-simple'>
                <img alt='상담사' src={data.photo ? STORAGE_PHOTO_BASE + data.photo : defaultPhoto}
                    className='counselorphoto backphoto' />
                <div>
                    <div className='fw_600 fs_20'>{data.name}</div>
                    <div className='fw_400 fs_16'
                        style={{ display: 'flex', alignItems: 'center' }}>
                        <img alt='별' src={starIcon} width={17} height={17} />
                        &nbsp;{data.averagescore.toFixed(1)} ({data.reviewcount})
                    </div>
                    {
                        data.usercode !== 5 && // 관리자가 만든 오피셜 상담사는 일단 삭제 못하도록 처리
                            data.usercode === Number(sessionStorage.getItem("usercode")) ?
                            <div className='counselordelbtn'>
                                <HighlightOffRounded color='action' fontSize='large'
                                    onClick={() => handleCounselorDelete(data)} />
                            </div> : ''
                    }
                </div>
            </div>
            <div className='mt_10 counselor-introduction'>
                {
                    data.introduction.split("\n").map((line, i) => (
                        <div key={i}>
                            {line}
                            {i !== data.introduction.split('\n').length - 1 && <br />}
                        </div>
                    ))
                }
            </div>
            <div className='mt_10 counsel-start'>
                <button type='button' className='counselinnerbtn officialbtn btn-jittery fw_600'
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    onClick={() => handleCounselClick(data)}>상담 시작!</button>
            </div>
        </div>
    );
};

export default CounselorCardBack;