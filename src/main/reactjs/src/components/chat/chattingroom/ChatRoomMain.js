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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const COUNSELOR_INITIAL_MESSAGE = "반갑습니다. 고민을 말씀해주세요. 언제든 답변해드리겠습니다.";
const MAXIMUM_INPUT_LENGTH = 300;
const MAXIMUM_STARS = 5;

const ChatRoomMain = () => {
    const [log, setLog] = useState([{
        'role': 'assistant', 'content': COUNSELOR_INITIAL_MESSAGE, 'speaker': 1
    }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [star, setStar] = useState(MAXIMUM_STARS);

    const nav = useNavigate();

    const SYSTEM_MESSAGE_FOR_TEST = "당신은 AI같은 심리 상담사입니다. 실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.";

    // useEffect(() => {
    //     console.log('나의 세션');
    //     console.log('id: ' + sessionStorage.getItem("id"));
    //     console.log('token: ' + sessionStorage.getItem("token"));
    // }, [])

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

    const submitLog = async () => {
        let logData = log.map((data) => ({
            'speaker': data.speaker,
            'content': data.content
        }));

        try {
            let response = await axios({
                method: 'post',
                url: `/chat/finish/noreview?userid=${sessionStorage.getItem('id')}&counselorcode=1`,
                data: JSON.stringify(logData),
                headers: { 'Content-Type': 'application/json' }
            });

            Swal.fire({
                icon: 'success',
                html: '채팅 내역이 저장되었습니다!<br/>요약본 페이지로 이동합니다.',
                confirmButtonColor: '#FF7170',
                confirmButtonText: '확인'
            }).then(() => {
                nav("/user/chat/summary?roomcode=" + response.data);
            })

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: '뭔가 문제 발생!',
                text: `Error: ${err}`,
                confirmButtonColor: '#FF7170',
                confirmButtonText: '확인'
            });
        }
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

    const handleReviewPass = async () => {
        Swal.fire({
            text: '채팅 내용 저장중...',
            showConfirmButton: false
        });

        await submitLog();
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