import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import info from '../../../../image/info.png';
import diagnosisImg1 from "../../../../image/diagnosis1.png";
import diagnosisImg2 from "../../../../image/diagnosis2.png";

const ChatLogButtons = ({ hasDiagnosis, handleSummaryClick, handleDiagnosisClick }) => {
    const nav = useNavigate();

    const handleInfoClick = () => {
        // sweetalert2 팝업 띄우기
        Swal.fire({
            title: '진단서 예시 및 간단 설명',
            html: '<span style="color: gray; display: block;">* 카드를 클릭하여 내용을 확인하세요! *</span><br><div style="border: 1px solid #5279FD; border-radius: 10px; overflow: hidden;"><img src="' + diagnosisImg1 + '" alt="이미지" style="width: 80%; height: auto;"><img src="' + diagnosisImg2 + '" alt="이미지" style="width: 80%; height: auto;"></div>',
            icon: 'info',
            confirmButtonColor: '#5279FD',
            confirmButtonText: '닫기',
        });
    };

    return (
        <div className='mt_25 chatlog-buttons'>
            <button className='lightblue long' style={{ color: '#536179' }} onClick={handleSummaryClick}>요약본 확인</button>
            &nbsp;&nbsp;
            <div style={{ position: 'relative' }}>
                {
                    hasDiagnosis ?
                        <span>
                            <button className='deepblue long' onClick={handleDiagnosisClick}>
                                나의 진단서 확인
                            </button>
                        </span>
                        :
                        <span>
                            <span role="img" aria-label="info-icon" className="info-icon" style={{ cursor: 'pointer', position: 'absolute', top: 3.5, right: -19 }} onClick={handleInfoClick}><img src={info} alt='Info Image' style={{ width: '20px', height: '20px' }} /></span>
                            <button className='deepblue long' onClick={handleDiagnosisClick}>
                                진단서 발급(500TP)
                            </button>
                        </span>
                }
            </div>
        </div>
    );
};

export default ChatLogButtons;