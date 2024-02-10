import React, { useCallback, useEffect, useState } from 'react';
import ChatContent from './ChatContent';
import ChatRoomMidBar from './ChatRoomMidBar';
import './ChatRoomStyle.css'
import getGPTResponse from '../api/gpt';
import ChatSubmit from './ChatSubmit';
import Swal from 'sweetalert2';
import ChatReviewModal from './ChatReviewModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../PageHeader';
import withReactContent from 'sweetalert2-react-content';
import ReviewAlert from './ReviewAlert';

const COUNSELOR_INITIAL_MESSAGE = "반갑습니다. 고민을 말씀해주세요. 언제든 답변해드리겠습니다.";
const MAXIMUM_INPUT_LENGTH = 300;
const MAXIMUM_STARS = 5;

const MySwal = withReactContent(Swal);


const ChatRoomMain = () => {
    const [log, setLog] = useState([{
        'role': 'assistant', 'content': COUNSELOR_INITIAL_MESSAGE, 'speaker': 1
    }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [star, setStar] = useState(MAXIMUM_STARS);
    const [showReview, setShowReview] = useState(false);

    const nav = useNavigate();

    const SYSTEM_MESSAGE_FOR_TEST = "당신은 AI같은 심리 상담사입니다. 실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.";

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '상담받기', url: '' }
    ];

    const PAGE_TITLE = 'TODAC 채팅';


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

    // 리뷰 관련

    const handleShowingReview = useCallback(() => {
        setShowReview(true);
    }, []);

    const handleHidingReview = useCallback(() => {
        setShowReview(false);
    }, []);

    const handleStarClick = useCallback((index) => {
        setStar(index + 1);
    }, []);

    const handleReviewGrant = () => {
        // TODO: 리뷰를 작성하는 경우
        alert("리뷰 작성은 아직 미구현입니다! 조금만 기다려주세요.\n선택한 별점: " + star);
    }

    const handleReviewPass = async () => {
        Swal.fire({
            text: '채팅 내용 저장중...',
            showConfirmButton: false
        });

        await submitLog();
    }

    const handleReviewClose = () => {
        handleHidingReview(false);
        MySwal.close();
    }

    const handleFinishChat = () => {
        // 1. 상담사의 메세지를 로딩 중인 경우
        if (loading) {
            Swal.fire({
                icon: 'warning',
                title: '답변을 기다려주세요!',
                html: '아직 상담사가 답변 중이에요!<br/>답변을 기다려 주세요!',
                confirmButtonText: '확인',
                confirmButtonColor: '#FF7170'
            })

            return;
        }

        // 2. 아무 메세지도 적지 않은 경우
        if (log.length <= 1) {
            Swal.fire({
                icon: 'warning',
                title: '상담을 종료하시겠어요?',
                html: '상담한 내역이 없습니다.<br/>이대로 상담을 종료하시겠습니까?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '네',
                cancelButtonText: '아니오',
                confirmButtonColor: '#FF7170',
                cancelButtonColor: '#9396A6'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        html: '상담이 종료되었습니다.<br/>채팅 메인 페이지로 돌아갑니다.',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#FF7170'
                    }).then(() => {
                        nav("/user/chat");
                    })
                }
            })

            return;
        }

        // 그 외: 리뷰 보여주기
        handleShowingReview();
    }



    return (
        <div className='chatmain mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />
            <ChatRoomMidBar handleFinishChat={handleFinishChat} />
            <ChatContent log={log} />
            <ChatSubmit input={input} maxlength={MAXIMUM_INPUT_LENGTH} handleInputChange={handleInputChange} handleInputSubmit={handleInputSubmit} />
            {/* 리뷰창: 별점 갱신을 위해 컴포넌트로 감싼 뒤, 내부에서 portal로 관리한다 */}
            <ReviewAlert reviewShow={showReview}>
                <ChatReviewModal star={star} maxStar={MAXIMUM_STARS} handleStarClick={handleStarClick}
                    handleReviewPass={handleReviewPass} handleReviewGrant={handleReviewGrant} handleReviewClose={handleReviewClose} />
            </ReviewAlert>
        </div>
    );
};

export default ChatRoomMain;