import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Faq = () => {
    const [answerStates, setAnswerStates] = useState({
        question1: false,
        question2: false,
        question3: false,
        question4: false,
      });
    
      const handleToggleAnswer = (question) => {
        setAnswerStates((prevState) => ({
          ...prevState,
          [question]: !prevState[question],
        }));
      };

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user" className='col_blue2'>마이 홈 {'>'} </Link>
                <Link to="/user/faq" className='col_blue2'>도움말</Link>
            </div>
            <div className='fs_25 fw_700'>도움말</div>

            <div className='mt_45 fw_500'>아이디 님, <br/>무엇을 도와드릴까요?</div>
            <div className='fs_20 fw_700 mt_45'>FAQ</div>
            <div className='mt_10 fs_14 fw_600'>
                <div className='faq_q bg_gray bor_gray1 py-2' onClick={() => handleToggleAnswer('question1')}>
                    <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                    <span>TODAC은 어떤 어플인가요?</span>
                </div>
                {answerStates.question1 && (
                <div className='faq_a bg_blue bor_gray1 py-2'>
                    <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                    <span>답변1</span>
                </div>
                )}
                <div className='faq_q bg_gray bor_gray1 py-2'  onClick={() => handleToggleAnswer('question2')}>
                    <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                    <span>회원탈퇴 하는 법을 알고싶어요.</span>
                </div>
                {answerStates.question2 && (
                <div className='faq_a bg_blue bor_gray1 py-2'>
                    <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                    <span>답변2</span>
                </div>
                )}
                <div className='faq_q bg_gray bor_gray1 py-2'  onClick={() => handleToggleAnswer('question3')}>
                    <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                    <span>포인트는 어떻게 얻을 수 있나요?</span>
                </div>
                {answerStates.question3 && (
                <div className='faq_a bg_blue bor_gray1 py-2'>
                    <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                    <span>답변3</span>
                </div>
                )}
                <div className='faq_q bg_gray bor_gray1 py-2' onClick={() => handleToggleAnswer('question4')}>
                    <img alt='질문' src={require("../../../image/ico_faq_q.png")} className='img-fluid mx-2'/>
                    <span>후원한 포인트는 어디에 이용되나요?</span>
                </div>
                {answerStates.question4 && (
                <div className='faq_a bg_blue bor_gray1 py-2'>
                    <img alt='답변' src={require("../../../image/ico_faq_a.png")} className='img-fluid mx-2'/>
                    <span>답변4</span>
                </div>
                )}
            </div>
        </div>
    );
};

export default Faq;