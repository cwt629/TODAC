import React, { useEffect, useState } from 'react';
import getGPTResponse from '../api/gpt';
import defaultProfile from '../../../image/default_profile_photo_blue.jpg';


const ChatContent = ({ log }) => {
    return (
        <div>
            {
                log.map((data, index) => (
                    <div key={index} style={{ backgroundColor: 'yellow', color: 'indigo', padding: '5px', borderRadius: '10px' }}>
                        {data.content}
                    </div>
                ))
            }
        </div>
    );
};

export default ChatContent;