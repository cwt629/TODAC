import React from 'react';
import PageHeader from '../../../PageHeader';

const CounselorCreateApp = () => {
    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '나만의 상담사', url: '' }
    ];

    const PAGE_TITLE = '나만의 상담사 만들기';

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
        </div>
    );
};

export default CounselorCreateApp;