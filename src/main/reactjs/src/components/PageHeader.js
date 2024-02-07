import React from 'react';
import { useNavigate } from 'react-router-dom';

/*
[parameter information]

1. routes
파란 navbar 부분을 구성하는 텍스트와 그 링크를 담은 딕셔너리의 배열.
각 요소마다 name과 url이 포함되어야 합니다.
url을 탈 필요가 없는 부분이라면, url을 빈 문자열로 넘겨주세요.

아래는 그 예시입니다.
------------------------------------------------------
const CURRENT_ROUTES = [
    { name: 'TODAC 채팅', url: '/user/chat' },
    { name: '상담받기', url: '/user/chat/counsel' }
];
------------------------------------------------------

2. title
페이지의 타이틀을 의미하는 문자열.
검고 굵은 글씨로 들어가는 텍스트를 넘겨주면 됩니다.

아래는 그 예시입니다.
------------------------------------------------------
const PAGE_TITLE = 'TODAC 채팅';
------------------------------------------------------
*/
const PageHeader = ({ routes, title }) => {
    const nav = useNavigate();

    return (
        <div className='pageheader'>
            <div className='fs_14 fw_500 col_blue2'>
                {
                    routes.map((data, index, origin) => (
                        <span key={index}>
                            <span className='header-clickable'
                                onClick={() => {
                                    if (data.url.length > 0)
                                        nav(data.url);
                                }}>
                                {data.name}
                            </span>
                            {(index < origin.length - 1) ? ' > ' : ''}
                        </span>
                    ))
                }
            </div>
            <div className='fs_24 fw_700'>
                {title}
            </div>
        </div>
    );
};

export default PageHeader;