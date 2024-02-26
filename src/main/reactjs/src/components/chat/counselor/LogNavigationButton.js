import React from 'react';

const LogNavigationButton = ({ handleClick }) => {
    const animateButton = (e) => {
        const button = e.target;
        button.classList.add('pressed'); // 버튼에 눌린 상태 클래스 추가
        setTimeout(() => {
            button.classList.remove('pressed'); // 버튼에 눌린 상태 클래스 제거
            handleClick(); // 클릭 이벤트 핸들러 호출
        }, 250); // 250밀리초(0.25초) 후에 클릭 이벤트 핸들러 호출
    };

    return (
        <div className='counselbtndiv counsel-lognav'>
            <div className='counselbtn fw_600 btn-3d cyan'
                onClick={animateButton}>
                나의 상담기록
            </div>
        </div>
    );
};

export default LogNavigationButton;