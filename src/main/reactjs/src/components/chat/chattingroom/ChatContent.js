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
                                {/* 줄바꿈의 경우 직접 split하여, 중간중간에 <br/>을 넣어준다 */}
                                {data.content.split("\n").map((line, i) => (
                                    <div key={i}>
                                        {line}
                                        {i !== data.content.split('\n').length - 1 && <br />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default ChatContent;