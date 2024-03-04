import React, { useCallback, useEffect, useState } from 'react';
import ChatContent from './ChatContent';
import ChatRoomMidBar from './ChatRoomMidBar';
import './ChatRoomStyle.css'
import getGPTResponse from '../api/gpt';
import ChatSubmit from './ChatSubmit';
import Swal from 'sweetalert2';
import ChatReviewModal from './ChatReviewModal';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import ReviewAlert from './ReviewAlert';
import defaultProfilePhoto from '../../../image/default_profile_photo_blue.jpg';
import { popupAchievement } from '../../../utils/achieveAlert';

const MAXIMUM_INPUT_LENGTH = 300;
const MAXIMUM_STARS = 5;

const ReactSwal = withReactContent(Swal);

const STORAGE_PHOTO_BASE = 'https://kr.object.ncloudstorage.com/guest-hch/TODAC/';
const STORAGE_COUNSELOR_FOLDER_NAME = 'counselors/';

const BADGE_NAME_PARTNERS = "모두가 나의 파트너";
const BADGE_NAME_FIVETODAC = "다섯 번의 토닥";

const ChatRoomMain = () => {
    const [query, setQuery] = useSearchParams();
    const counselorcode = query.get("counselorcode");
    const usercode = sessionStorage.getItem("usercode");

    const [log, setLog] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [star, setStar] = useState(MAXIMUM_STARS);
    const [showReview, setShowReview] = useState(false);
    const [initialData, setInitialData] = useState(null);
    const [systemMessage, setSystemMessage] = useState('');

    const nav = useNavigate();

    // 초기 데이터 로딩
    useEffect(() => {
        axios.get(`/chat/init?counselorcode=${counselorcode}&usercode=${sessionStorage.getItem("usercode")}`)
            .then((res) => {
                setInitialData(res.data);
                setLog([{
                    'role': 'assistant', 'content': res.data.counselorGreeting,
                    'speaker': counselorcode,
                    'photo': (res.data.counselorPhoto) ? STORAGE_PHOTO_BASE + STORAGE_COUNSELOR_FOLDER_NAME + res.data.counselorPhoto : defaultProfilePhoto
                }]);
                setSystemMessage(`당신은 ${res.data.counselorPersonality} 심리 상담사이며, 당신의 이름은 ${res.data.counselorName}입니다.
                공식 상담사는 '토닥봇', '설리반', '공감이', '너티야', '키키', '츤데레'로 총 6명입니다.
                '토닥봇'은 AI같은 심리 상담사로, 로봇같지만 언제나 진정으로 위로해주는 상담사입니다.
                '설리반'은 학교의 선생님같은 심리 상담사로, 선생님과 같이 따뜻하게 품어주는 상담사입니다.
                '공감이'는 공감을 잘 해주는 친구같은 심리 상담사로, 친구처럼 편안하게 대할 수 있는 상담사입니다.
                '너티야'는 냉철하고 팩트로 이야기하는 심리 상담사로, 좀 더 객관적인 시선으로 보는 상담사입니다.
                '키키'는 장난기 많은 아이같은 심리 상담사로, 장난기는 많지만 마음은 따뜻한 여자 아이같은 상담사입니다.
                '츤데레'는 무심한 듯 챙겨주는 츤데레같은 심리 상담사로, 무뚝뚝해보이지만 내면은 따뜻한 상담사입니다.
                중복되는 이름의 상담사는 없으며, 이 안에 당신의 이름이 있으면 당신은 공식 상담사입니다.
                사용자가 '데브옵스 3기 분들에게 한마디만 해줘'라고 하면, 6개월동안 프로그래밍 공부하느라고 너무 고생 많았다고 얘기해주면 됩니다.
                실제 대화하듯이 구어체로 답변하고, 답변은 300자를 넘지 않아야 합니다.`);
            })
    }, [])

    // 채팅이 생길 때마다 아래로 자동 스크롤
    useEffect(() => {
        let chatdiv = document.querySelector('div.chatcontent');
        chatdiv.scrollTop = chatdiv.scrollHeight;
    }, [log]);

    const handleInputChange = (newInput) => {
        setInput(newInput);
    }

    const handleInputSubmit = () => {
        if (!initialData) {
            ReactSwal.fire({
                title: '초기 데이터 로딩 중!',
                text: '초기 데이터 로딩 중입니다. 조금만 기다려주세요!',
                icon: 'warning',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            });
            return;
        }

        if (loading) {
            ReactSwal.fire({
                title: '상담사가 아직 답변중!',
                html: '상담사가 아직 답변중입니다.<br/>잠시 후 시도해주세요.',
                icon: 'warning',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            });
            return;
        }

        if (input.length === 0) {
            ReactSwal.fire({
                title: '입력 없음!',
                text: '메세지를 입력해주세요.',
                icon: 'error',
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            });

            return;
        }

        const changedLog = [...log, {
            'role': 'user', 'content': input, 'speaker': 0,
            'photo': (initialData.userPhoto) ? initialData.userPhoto : defaultProfilePhoto
        }]; // 사용자의 입력을 미리 log에 담음
        setLog(changedLog);
        setLoading(true);
        getGPTResponse(systemMessage, changedLog)
            .then((msg) => {
                setLog([
                    ...changedLog,
                    {
                        ...msg, 'speaker': counselorcode,
                        'photo': (initialData.counselorPhoto) ? STORAGE_PHOTO_BASE + STORAGE_COUNSELOR_FOLDER_NAME + initialData.counselorPhoto : defaultProfilePhoto
                    }
                ]);
                setLoading(false);
            });
        setInput('');
    }

    const submitLog = async (score = -1) => {
        let logData = log.map((data) => ({
            'speaker': data.speaker,
            'content': data.content
        }));

        try {
            let response = await axios({
                method: 'post',
                url: `/chat/finish?userid=${sessionStorage.getItem('id')}&counselorcode=${counselorcode}&score=${score}`,
                data: JSON.stringify(logData),
                headers: { 'Content-Type': 'application/json' }
            });

            // chatroom 적용 뒤, 업적 처리

            // 1. '모두가 나의 파트너': 모든 상담사와 1회 이상 상담
            let badgeResponsePartner = await axios.get("/chat/achieve/partners?usercode=" + usercode);
            if (badgeResponsePartner.data) {
                // 업적 달성 처리 시도
                let achieveResult = await axios.post(`/badgeinsert?usercode=${usercode}&achievename=${BADGE_NAME_PARTNERS}`);

                if (achieveResult.data) {
                    await popupAchievement(BADGE_NAME_PARTNERS);
                }
            }

            // 2. '다섯 번의 토닥': 채팅 5회 이상 종료
            let badgeResponseFive = await axios.get("/chat/achieve/fivetodac?usercode=" + usercode);
            if (badgeResponseFive.data) {
                // 업적 달성 처리 시도
                let achieveResult = await axios.post(`/badgeinsert?usercode=${usercode}&achievename=${BADGE_NAME_FIVETODAC}`);

                if (achieveResult.data) {
                    await popupAchievement(BADGE_NAME_FIVETODAC);
                }
            }

            ReactSwal.fire({
                icon: 'success',
                title: `${score >= 0 ? '소중한 리뷰 감사합니다!' : ''}`,
                html: `채팅 내역${score >= 0 ? '과 별점' : ''}이 저장되었습니다!<br/>요약본 페이지로 이동합니다.`,
                confirmButtonColor: '#5279FD',
                confirmButtonText: '확인'
            }).then(() => {
                nav("/user/chat/summary?chatroomcode=" + response.data);
            })

        } catch (err) {
            ReactSwal.fire({
                icon: 'error',
                title: '뭔가 문제 발생!',
                text: `Error: ${err}`,
                confirmButtonColor: '#5279FD',
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

    const handleReviewGrant = async () => {
        ReactSwal.fire({
            text: '채팅 내용 및 별점 저장중...',
            showConfirmButton: false
        });

        await submitLog(star);
    }

    const handleReviewPass = async () => {
        ReactSwal.fire({
            text: '채팅 내용 저장중...',
            showConfirmButton: false
        });

        await submitLog();
    }

    const handleReviewClose = () => {
        handleHidingReview(false);
        ReactSwal.close();
    }

    const handleFinishChat = () => {
        // 1. 상담사의 메세지를 로딩 중인 경우
        if (loading) {
            ReactSwal.fire({
                icon: 'warning',
                title: '답변을 기다려주세요!',
                html: '아직 상담사가 답변 중이에요!<br/>답변을 기다려 주세요!',
                confirmButtonText: '확인',
                confirmButtonColor: '#5279FD'
            })

            return;
        }

        // 2. 아무 메세지도 적지 않은 경우
        if (log.length <= 1) {
            ReactSwal.fire({
                icon: 'warning',
                title: '상담을 종료하시겠어요?',
                html: '상담한 내역이 없습니다.<br/>이대로 상담을 종료하시겠습니까?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '예',
                cancelButtonText: '아니오',
                confirmButtonColor: '#5279FD',
            }).then((result) => {
                if (result.isConfirmed) {
                    ReactSwal.fire({
                        icon: 'success',
                        html: '상담이 종료되었습니다.<br/>채팅 메인 페이지로 돌아갑니다.',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#5279FD'
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
            <ChatRoomMidBar counselorname={initialData?.counselorName} handleFinishChat={handleFinishChat} />
            <ChatContent log={log} loading={loading}
                nextCounselorPhoto={initialData?.counselorPhoto ? STORAGE_PHOTO_BASE + STORAGE_COUNSELOR_FOLDER_NAME + initialData.counselorPhoto : defaultProfilePhoto} />
            <ChatSubmit input={input} maxlength={MAXIMUM_INPUT_LENGTH} handleInputChange={handleInputChange} handleInputSubmit={handleInputSubmit} />
            {/* 리뷰창: 별점 갱신을 위해 컴포넌트로 감싼 뒤, 내부에서 portal로 관리한다 */}
            <ReviewAlert reviewShow={showReview} handleClose={handleHidingReview}>
                <ChatReviewModal star={star} maxStar={MAXIMUM_STARS} counselorname={initialData?.counselorName}
                    handleStarClick={handleStarClick} handleReviewPass={handleReviewPass} handleReviewGrant={handleReviewGrant} handleReviewClose={handleReviewClose} />
            </ReviewAlert>
        </div>
    );
};

export default ChatRoomMain;