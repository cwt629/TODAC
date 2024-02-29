import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import diagnosisImg1 from "../../../../image/diagnosis1.png";
import diagnosisImg2 from "../../../../image/diagnosis2.png";

const ChatLogButtons = ({ hasDiagnosis, handleSummaryClick, handleDiagnosisClick }) => {
    const nav = useNavigate();

    const handleInfoClick = () => {
        // sweetalert2 팝업 띄우기
        Swal.fire({
            title: '진단서 예시 및 간단 설명',
            html: '<div style="border: 1px solid #5279FD; border-radius: 10px; overflow: hidden;"><img src="' + diagnosisImg1 + '" alt="이미지" style="width: 80%; height: auto;"><img src="' + diagnosisImg2 + '" alt="이미지" style="width: 80%; height: auto;"></div>',
            icon: 'info',
            confirmButtonColor: '#5279FD',
            confirmButtonText: '닫기',
        });
    };

    return (
        <div className='mt_45' style={{ textAlign: 'center', height: '55px' }}>
            <button className='lightblue long' style={{ color: '#536179' }} onClick={handleSummaryClick}>요약본 확인</button>
            &nbsp;&nbsp;
            {
                hasDiagnosis ?
                    <span>
                        <button className='deepblue long' onClick={handleDiagnosisClick}>
                            나의 진단서 확인
                        </button>
                    </span>
                    :
                    <span>
                        <button className='deepblue long' onClick={handleDiagnosisClick}>
                            진단서 발급(500P)
                        </button>
                        <span role="img" aria-label="info-icon" className="info-icon" style={{ cursor: 'pointer', float: 'right' }} onClick={handleInfoClick}>ℹ️</span>
                    </span>
            }
        </div>
    );
};

export default ChatLogButtons;