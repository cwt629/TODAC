import React, { useEffect, useState } from 'react';
import ChatContent from './ChatContent';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomMidBar from './ChatRoomMidBar';
import './ChatRoomStyle.css'
import getGPTResponse from '../api/gpt';
import ChatSubmit from './ChatSubmit';
import Swal from 'sweetalert2';
import ChatReviewModal from './ChatReviewModal';
import { renderToString } from 'react-dom/server';

const COUNSELOR_INITIAL_MESSAGE = "안녕! 난 장난기 가득한 상담사야! 뭐가 고민이니?";
const MAXIMUM_INPUT_LENGTH = 300;
const MAXIMUM_STARS = 5;

const ChatRoomMain = () => {
    const [log, setLog] = useState([{
        'role': 'assistant', 'content': COUNSELOR_INITIAL_MESSAGE, 'speaker': 1
    }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [star, setStar] = useState(MAXIMUM_STARS);

    const SYSTEM_MESSAGE_FOR_TEST = "당신은 장난기 가득한 심리 상담사입니다. 실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.";


    // log 갱신이 완료되면 그때 input과 로딩 상태를 갱신하기
    useEffect(() => {
        setInput('');
        setLoading(false);
    }, [log])

    const handleInputChange = (newInput) => {
        setInput(newInput);
    }

    const handleInputSubmit = () => {
        if (loading) {
            Swal.fire({
                title: '상담사가 아직 답변중!',
                text: '상담사가 아직 답변중입니다. 잠시 후 시도해주세요.',
                icon: 'warning',
                confirmButtonColor: '#FF7170',
                confirmButtonText: '확인'
            });
            return;
        }

        if (input.length === 0) {
            Swal.fire({
                title: '입력 없음!',
                text: '메세지를 입력해주세요.',
                icon: 'error',
                confirmButtonColor: '#FF7170',
                confirmButtonText: '확인'
            });
            return;
        }

        setLoading(true);
        getGPTResponse(input, SYSTEM_MESSAGE_FOR_TEST, log)
            .then((msg) => {
                setLog([
                    ...log,
                    { 'role': 'user', 'content': input, 'speaker': 0 },
                    { ...msg, 'speaker': 1 }
                ]);
            });
    }

    const handleStarClick = (index) => {
        setStar(index + 1); // 0~4번째 별은 각각 1~5점을 의미
        alert(`${index + 1}점 주려고 함`);
        console.log(star);
    }

    const handleReviewGrant = () => {
        // TODO: 리뷰를 작성하는 경우
        alert("리뷰 작성은 아직 미구현입니다! 조금만 기다려주세요.");
    }

    const handleReviewPass = () => {
        alert("리뷰 패스!");
    }

    const handleReviewClose = () => {
        Swal.close();
    }

    // JSX 컴포넌트를 문자열로 변환한다 -> Swal 안의 html에 넣기 위한 작업
    const CHAT_REVIEW_MODAL = renderToString(
        <ChatReviewModal star={star} maxStar={MAXIMUM_STARS} />
    );

    const handleFinishChat = () => {
        Swal.fire({
            title: '상담은 어떠셨나요?',
            html: CHAT_REVIEW_MODAL,
            showConfirmButton: false,
            didOpen: () => {
                const passButton = document.querySelector('.review-button.review-pass');
                const grantButton = document.querySelector('.review-button.review-grant');
                const closeButton = document.querySelector('.review-button.review-close');

                // 별점 - 클릭 이벤트
                document.querySelectorAll('span.review-star').forEach((stardiv, index) => {
                    stardiv.addEventListener('click', () => {
                        handleStarClick(index);
                    })
                })

                // 건너뛰기 클릭 이벤트
                passButton.addEventListener('click', () => {
                    handleReviewPass();
                })

                // 별점주기 클릭 이벤트
                grantButton.addEventListener('click', () => {
                    handleReviewGrant();
                })

                // 닫기 클릭 이벤트
                closeButton.addEventListener('click', () => {
                    handleReviewClose();
                })
            }
        });
    }



    return (
        <div className='chatmain'>
            <ChatRoomHeader />
            <ChatRoomMidBar handleFinishChat={handleFinishChat} />
            <ChatContent log={log} />
            <ChatSubmit input={input} maxlength={MAXIMUM_INPUT_LENGTH} handleInputChange={handleInputChange} handleInputSubmit={handleInputSubmit} />
        </div>
    );
};

export default ChatRoomMain;