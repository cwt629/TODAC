import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import diagnosisImg1 from '../../../image/diagnosis1.png';
import diagnosisImg2 from '../../../image/diagnosis2.png';
import counselor from '../../../image/counselor.png';
import info from '../../../image/info.png';
import you from '../../../image/you.png';
import './DocumentStyle.css';
import axios from 'axios';
import summarizeContent from '../api/summarize';
import PageHeader from '../../PageHeader';

const ChatSummary = () => {
    const [logList, setLogList] = useState([]);
    const nav = useNavigate();
    const [query, setQuery] = useSearchParams();
    const roomcode = query.get("chatroomcode");
    const [loading, setLoading] = useState(true); // 요약본 생성 중인지 여부
    const [summarizedMessages, setSummarizedMessages] = useState({ summarizedUserMessage: "", summarizedCounselorMessage: "" });
    const [hasDiagnosis, setHasDiagnosis] = useState(false);

    // 포인트 사용
    const [donationAmount, setDonationAmount] = useState(500);
    const usercode = sessionStorage.getItem("usercode");

    const CURRENT_ROUTES = [
        { name: 'TODAC 채팅', url: '/user/chat' },
        { name: '오늘의 상담 요약', url: '' }
    ];

    const PAGE_TITLE = "오늘의 상담 요약";

    const goDiagnosis = () => {
        Swal.fire({
            title: hasDiagnosis ? '진단서 확인' : '진단서 발급',
            text: '진단서 페이지로 이동하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#5279FD',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                nav('../diagnosis?chatroomcode=' + roomcode);
            }
        });
    }

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

    const summary = async () => {
        try {
            const response = await axios.get("/chat/summary?chatroomcode=" + roomcode);
            // console.log("로그 불러오려고 함");
            // console.log(response);
            setLogList(response.data);
            const { summarizedUserMessage, summarizedCounselorMessage } = await summarizeMessages(response.data);
            setSummarizedMessages({ summarizedUserMessage, summarizedCounselorMessage });
            await saveSummarizedMessages(summarizedUserMessage, summarizedCounselorMessage);
        } catch (error) {
            console.error('Error fetching summary list:', error);
        }
    };

    // 사용자 고민 내용과 상담사의 답변 내용을 요약
    const summarizeMessages = async (chatlog) => {
        Swal.fire({
            title: '요약본 생성중',
            text: '잠시만 기다려주세요!',
            icon: 'info',
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        // console.log("지금 보내고자 하는 로그");
        // console.log(chatlog);

        const userLog = chatlog.filter((log) => (log.speaker === 0));
        const counselorLog = chatlog.filter((log) => (log.speaker !== 0));

        const summarizedUserMessage = await summarizeContent(
            userLog,
            "이 내용은 당신이 사용자와 나눈 심리 상담 내용입니다. 여기서 사용자의 고민을 요약해주세요. 요약은 짧을수록 좋으며, 길어도 300자를 넘지 않게 해주세요."
        );
        const summarizedCounselorMessage = await summarizeContent(
            counselorLog,
            "이 내용은 당신이 사용자와 나눈 심리 상담 내용입니다. 여기서 상담사인 당신의 답변을 요약해주세요. 요약은 짧을수록 좋으며, 길어도 300자를 넘지 않게 해주세요."
        );

        Swal.close(); // 요약이 완료되면 알림창 닫기

        return { summarizedUserMessage: summarizedUserMessage, summarizedCounselorMessage: summarizedCounselorMessage };
    };

    const getSummarizedMessages = async () => {
        await summary();
    };

    const saveSummarizedMessages = async (summarizedUserMessage, summarizedCounselorMessage) => {
        await axios({
            method: 'post',
            url: "/chat/summary/save?chatroomcode=" + roomcode,
            data: {
                worry: summarizedUserMessage.content,
                answer: summarizedCounselorMessage.content
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const checkData = async () => {
        try {
            const response = await axios.get("/chat/summary/check?chatroomcode=" + roomcode);
            if (response.data) {
                // console.log("요약본 있음")
                // console.log(response)
                setSummarizedMessages({
                    summarizedUserMessage: { content: response.data.worry },
                    summarizedCounselorMessage: { content: response.data.answer }
                });
            }
            else {
                getSummarizedMessages();
            }
        } catch (error) {
            console.error("Error fetching summarized messages: ", error);
        } finally {
            setLoading(false); // 요약본 생성 완료 후 loading 상태 변경
        }
    };

    useEffect(() => {
        // 이 함수 안에서 할 일
        // 첫 로드 시 이미 해당 roomcode에 대한 요약이 있으면 해당 데이터를 summarizedMessages에 set해주기

        // 해당 roomcode에 대한 요약이 없으면
        // 1. 로그 받아와서 logList에 넣고
        // 2. 새로운 요약을 생성하며 summarizedMessages에 set해주고 해당 요약을 DB에 저장 (밑에 getSummarizedMessages)

        // 이 함수는 말그대로, 지금 만든 요약본을 DB에 집어넣는 작업만 하도록 하자.
        checkData();
        axios.get("/chat/diagnosis/check?chatroomcode=" + roomcode)
            .then((res) => {
                setHasDiagnosis(res.data ? true : false);
            })
    }, []);

    // 클릭 이벤트 처리 함수
    const handleFlip = (e) => {
        // 현재 클릭된 요소의 부모에 clicked 클래스를 추가하여 효과 적용
        e.currentTarget.parentElement.classList.toggle('clicked');
    };

    return (
        <div className='mx_30'>
            <PageHeader routes={CURRENT_ROUTES} title={PAGE_TITLE} />

            <div className='flip-container mx_30 mt_25'>
                <div className='summaryContent fs_14 fw_500 mt_10 flipper' onClick={handleFlip}>
                    <div className='front'>
                        <img src={you} alt='You Image' />
                    </div>
                    <div className='back'>
                        <span className='fs_20 fw_700' style={{ borderBottom: 'solid', borderColor: '#D4E4F2' }}>내 고민 요약</span><br /><br />
                        <div style={{ height: '175px', overflowY: 'auto' }}>{summarizedMessages.summarizedUserMessage?.content}</div>
                    </div>
                </div>
            </div>
            <br />
            <div className='flip-container mx_30 mt_10'>
                <div className='summaryAnswerContent fs_14 fw_500 mt_10 flipper' onClick={handleFlip}>
                    <div className='front'>
                        <img src={counselor} alt='Counselor Image' />
                    </div>
                    <div className='back'>
                        <span className='fs_20 fw_700' style={{ borderBottom: 'solid', borderColor: 'whitesmoke' }}>상담사의 답변 요약</span><br /><br />
                        <div style={{ height: '175px', overflowY: 'auto' }}>{summarizedMessages.summarizedCounselorMessage?.content}</div>
                    </div>
                </div>
            </div>

            <br />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button className='white long' onClick={() => nav('../../')}>마이 홈 이동하기</button>
                <div style={{ position: 'relative' }}>
                    {
                        (hasDiagnosis) ?
                            <button className='deepblue long' onClick={goDiagnosis}>나의 진단서 확인</button>
                            :
                            <span>
                                <span role="img" aria-label="info-icon" className="info-icon" style={{ cursor: 'pointer', position: 'absolute', top: 3.5, right: -24 }} onClick={handleInfoClick}><img src={info} alt='Info Image' style={{ width: '20px', height: '20px' }} /></span>
                                <button className='deepblue long' onClick={goDiagnosis}>진단서 발급(500TP)</button>
                            </span>
                    }

                </div>
            </div>
        </div >
    );
};

export default ChatSummary;
