import React from 'react';
import './ChatLoading.css';

const ChatContent = ({ log, loading, nextCounselorPhoto, isPreview = false }) => {
    return (
        <div className={`chatcontent fs_14 mt_10 ${isPreview ? 'chatpreview' : ''}`}>
            {
                log.map((data, index) => {
                    let compClass = (data.speaker > 0) ? 'chatcomponent counselor' : 'chatcomponent user';

                    return (
                        <div key={index} className={compClass} >
                            <img alt='프로필사진' className='profile'
                                src={data.photo} />
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
            {
                loading ? (
                    <div className='chatcomponent counselor'>
                        <img alt='프로필사진' className='profile'
                            src={nextCounselorPhoto} />
                        <div className='chat' >
                            <div className='chatloader' />
                        </div>
                    </div>
                )
                    :
                    ''
            }
        </div>
    );
};

export default ChatContent;