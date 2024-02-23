import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import diagnosisImg from '../../../../image/diagnosis.png';


const ChatLogButtons = ({ hasDiagnosis, handleDiagnosisClick }) => {
    const nav = useNavigate();

    const handleInfoClick = () => {
        // sweetalert2 팝업 띄우기
        Swal.fire({
            title: '진단서 예시 및 간단 설명',
            html: '<div style="border: 1px solid red; border-radius: 10px; overflow: hidden;"><img src="' + diagnosisImg + '" alt="이미지" style="width: 80%; height: auto;"></div>',
            icon: 'info',
            confirmButtonColor: '#FF7170',
            confirmButtonText: '닫기',
        });
    };

    return (
        <div className='mt_45' style={{ textAlign: 'center', height: '55px' }}>
            <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../loglist')}>뒤로가기</button>
            &nbsp;&nbsp;
            {
                hasDiagnosis ?
                    <span>
                        <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={handleDiagnosisClick}>
                            나의 진단서 확인
                        </button>
                    </span>
                    :
                    <span>
                        <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={handleDiagnosisClick}>
                            진단서 발급(500P)
                        </button>
                        <span role="img" aria-label="info-icon" className="info-icon" style={{ cursor: 'pointer' }} onClick={handleInfoClick}>ℹ️</span>
                    </span>
            }
        </div>
    );
};

export default ChatLogButtons;