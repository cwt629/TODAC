import React from 'react';
import defaultPhoto from '../../../image/default_profile_photo_blue.jpg';

const STORAGE_PHOTO_BASE = 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/counselors/';

const CounselorProfile = ({ data }) => {
    return (
        <div className='counselorprofile bor_blue1 bg_blue br_5 mt_25'>
            {
                data &&
                <div>
                    <img alt='상담사프로필' src={data.photo ? STORAGE_PHOTO_BASE + data.photo : defaultPhoto}
                        className='counselorphoto' />
                    <div className='col_blue2'>상담사 프로필</div><br />
                    <div className='fs_18 fw_600'>{data.name} 상담사</div><br /><br />
                    <div style={{ overflowY: 'auto' }}>
                        {
                            data.introduction.split("\n").map((line, i) => (
                                <div key={i}>
                                    {line}
                                    {i !== data.introduction.split('\n').length - 1 && <br />}
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    );
};

export default CounselorProfile;