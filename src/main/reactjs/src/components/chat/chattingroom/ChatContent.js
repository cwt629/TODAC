import React from 'react';
import defaultPhoto from '../../../image/default_profile_photo_blue.jpg';

const ChatContent = ({ log }) => {
    return (
        <div className='chatcontent fs_14 bor_red bg_red mt_10'>
            {
                log.map((data, index) => {
                    let compClass = (data.speaker > 0) ? 'chatcomponent counselor' : 'chatcomponent user';

                    return (
                        <div key={index} className={compClass} >
                            <img alt='프로필사진' className='profile'
                                src={defaultPhoto} />
                            <div className='chat'>
                                {data.content}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ChatContent;