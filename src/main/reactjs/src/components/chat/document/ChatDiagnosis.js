import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './DocumentStyle.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import summarizeContent from '../api/summarize';

const ChatDiagnosis = () => {
    const [logList, setLogList] = useState([]); // 로그 전체
    const [summaryList, setSummaryList] = useState([]); // 요약 로그
    const nav = useNavigate();
    const [query, setQuery] = useSearchParams();
    const roomcode = query.get("chatroomcode");
    const [loading, setLoading] = useState(true); // 요약본 생성 중인지 여부
    const [summarizedMessages, setSummarizedMessages] = useState({ summarizedUserMessage: "", summarizedCounselorMessage: "" });
    const [diagnosisMessages, setDiagnosisMessages] = useState({ analyzedUserMessage: "", recommendedActivitiesUserMessage: "" });

    console.log("roomcode:" + roomcode);

    // 포인트 사용
    const [donationAmount, setDonationAmount] = useState(500);
    const usercode = sessionStorage.getItem("usercode");

    const pointUse = () => {
        // 진단서 발급을 시도하기 전에 진단서가 이미 발급되었는지 확인
        axios.get("/chat/diagnosis/check?chatroomcode=" + roomcode)
            .then(response => {
                if (response.data) {
                    // 이미 진단서가 발급된 경우 알림 후 진단서 페이지로 이동
                    Swal.fire({
                        icon: 'warning',
                        html: '이미 진단서가 발급되었습니다.',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#5279FD'
                    }).then(() => {
                        nav('../diagnosis?chatroomcode=' + roomcode);
                    });
                } else {
                    // 진단서 발급 시도
                    Swal.fire({
                        title: '진단서 발급',
                        text: '진단서를 발급하시겠습니까?',
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#5279FD',
                        cancelButtonColor: '#FF7170',
                        confirmButtonText: '예',
                        cancelButtonText: '아니오'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            const url = "/payment?amount=" + donationAmount + "&usercode=" + usercode + "&type=진단서 발급";
                            axios.post(url)
                                .then(res => {
                                    if (res.data === false) {
                                        // 포인트 부족 시 충전 안내
                                        Swal.fire({
                                            icon: 'warning',
                                            html: '포인트가 부족합니다. 포인트를 충전하시겠습니까?',
                                            showCancelButton: true,
                                            confirmButtonColor: '#5279FD',
                                            cancelButtonColor: '#FF7170',
                                            confirmButtonText: '예',
                                            cancelButtonText: '아니오'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                nav('../../');
                                            }
                                            else {
                                                nav('../summary?chatroomcode=' + roomcode);
                                            }
                                        });
                                    }
                                    else {
                                        // 진단서 발급 완료
                                        Swal.fire({
                                            icon: 'warning',
                                            html: '진단서가 발급되었습니다.',
                                            confirmButtonText: '확인',
                                            confirmButtonColor: '#5279FD'
                                        }).then(() => {
                                            getDiagnosisMessages();
                                        });
                                    }
                                })
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error checking diagnosis:', error);
            });
    }

    const summaryDB = async () => {
        try {
            const response = await axios.get("/chat/diagnosis?chatroomcode=" + roomcode);
            console.log("요약 내용 DB에서 불러옴");
            console.log(response);
            setSummaryList(response.data);
            const { summarizedUserMessage, summarizedCounselorMessage } = await summarizeMessages(response.data);
            setSummarizedMessages({ summarizedUserMessage, summarizedCounselorMessage });
        } catch (error) {
            console.error('Error fetching summary list:', error);
        }
    };

    // 심리 분석 내용 및 추천 활동 내용을 생성하고 저장
    const diagnosis = async () => {
        try {
            const response = await axios.get("/chat/summary?chatroomcode=" + roomcode);
            console.log("대화 로그 불러오려고 함");
            console.log(response);
            setLogList(response.data);
            const { analyzedUserMessage, recommendedActivitiesUserMessage } = await diagnosisAiMessages(response.data);
            setDiagnosisMessages({ analyzedUserMessage, recommendedActivitiesUserMessage });
            await saveDiagnosisMessages(analyzedUserMessage, recommendedActivitiesUserMessage);
        } catch (error) {
            console.error('Error fetching analyze:', error);
        }
    };

    // 요약 내용을 DB에서 불러옴
    const summarizeMessages = async (chatlog) => {
        console.log("지금 보내고자 하는 로그");
        console.log(chatlog);
        const chatLogWorry = chatlog[0].worry;
        const chatLogAnswer = chatlog[0].answer;

        console.log(chatLogWorry);
        console.log(chatLogAnswer);

        return { summarizedUserMessage: chatLogWorry, summarizedCounselorMessage: chatLogAnswer };
    };

    // 사용자의 고민 내용을 바탕으로 심리 분석 및 활동 추천
    const diagnosisAiMessages = async (chatlog) => {
        Swal.fire({
            title: '진단서 생성중',
            text: '잠시만 기다려주세요!',
            icon: 'info',
            timerProgressBar: true,
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        console.log("심리 로그");
        console.log(chatlog);

        const analyzeUserLog = chatlog.filter((log) => (log.speaker === 0));
        const recommendedActivitiesUserLog = chatlog.filter((log) => (log.speaker === 0));

        console.log(analyzeUserLog);

        const analyzedUserMessage = await summarizeContent(
            analyzeUserLog,
            "이 내용은 당신이 사용자와 나눈 심리 상담 내용입니다. 여기서 사용자의 고민을 토대로 심리 분석을 해주면 됩니다. 최대한 자세하게 심리 분석을 하되, 글자 수는 300자를 넘지 않게 해주세요."
        );

        const recommendedActivitiesUserMessage = await summarizeContent(
            recommendedActivitiesUserLog,
            "이 내용은 당신이 사용자와 나눈 심리 상담 내용입니다. 여기서 사용자의 고민을 토대로 활동을 추천해주면 됩니다. 예를 들면, 등산, 책 읽기가 있습니다. 글자 수는 300자를 넘지 않게 해주세요."
        );

        Swal.close(); // 진단서 제작이 완료되면 알림창 닫기

        return { analyzedUserMessage: analyzedUserMessage, recommendedActivitiesUserMessage: recommendedActivitiesUserMessage };
    };

    const getSummarizedMessages = async () => {
        await summaryDB();
    };

    const getDiagnosisMessages = async () => {
        await diagnosis();
    };

    const saveDiagnosisMessages = async (analyzedUserMessage, recommendedActivitiesUserMessage) => {
        await axios({
            method: 'post',
            url: "/chat/diagnosis/save?chatroomcode=" + roomcode,
            data: {
                deepanswer: analyzedUserMessage.content,
                advice: recommendedActivitiesUserMessage.content
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const checkData = async () => {
        try {
            const response = await axios.get("/chat/diagnosis/check?chatroomcode=" + roomcode);
            if (response.data) {
                console.log("response.data.usercode:" + response.data.usercode);
                console.log("usercode:" + usercode);
                if (response.data.usercode == usercode || usercode == 5) {
                    getSummarizedMessages();
                    console.log("진단서 있음")
                    console.log(response)
                    setDiagnosisMessages({
                        analyzedUserMessage: { content: response.data.deepanswer },
                        recommendedActivitiesUserMessage: { content: response.data.advice }
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        html: '해당 진단서에 접근할 수 있는 권한이 없습니다.',
                        confirmButtonText: '확인',
                        confirmButtonColor: '#5279FD'
                    }).then(() => {
                        // 이전 페이지로 이동
                        nav('../../');
                    });
                }
            }
            else {
                getSummarizedMessages();
                pointUse();
            }
        } catch (error) {
            console.error("Error fetching diagnosis messages: ", error);
        } finally {
            setLoading(false); // 진단서 생성 완료 후 loading 상태 변경
        }
    };

    useEffect(() => {
        checkData();
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/counsel" className='col_blue2'>상담 받기 {'>'} </Link>
                <Link to="/user/chat/summary" className='col_blue2'>요약 {'>'}</Link>
                <Link to="/user/chat/diagnosis" className='col_blue2'>진단서</Link>
            </div>
            <div className='fs_25 fw_700'>나의 진단서</div>
            <br />
            <div className='diagnosisSummaryContent fs_14 fw_500 mt_10'>
                <span className='fs_20 fw_700' style={{ borderBottom: 'solid', borderColor: '#D4E4F2' }}>내 고민 요약</span><br />
                {summarizedMessages.summarizedUserMessage}
            </div>
            <br />
            <div className='diagnosisSummaryAnswerContent fs_14 fw_500 mt_10'>
                <span className='fs_20 fw_700' style={{ borderBottom: 'solid', borderColor: 'whitesmoke' }}>상담사의 답변 요약</span><br />
                {summarizedMessages.summarizedCounselorMessage}
            </div>
            <br />
            <div className='diagnosisPsychology fs_14 fw_500 mt_10'>
                <span className='fs_20 fw_700' style={{ borderBottom: 'solid', borderColor: '#ccd6f5' }}>심리 분석</span><br />
                {diagnosisMessages.analyzedUserMessage?.content}
            </div>
            <br />
            <div className='diagnosisActing fs_14 fw_500 mt_10'>
                <span className='fs_18 fw_700' style={{ borderBottom: 'solid', borderColor: '#bfe1ff' }}>고민이 계속될 땐, 이렇게 해보세요 🤗</span><br />
                {diagnosisMessages.recommendedActivitiesUserMessage?.content}
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className='white long' onClick={() => nav('../../')}>마이 홈 이동하기</button>
            </div>
        </div>
    );
};

export default ChatDiagnosis;