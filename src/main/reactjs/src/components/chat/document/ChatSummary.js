import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import diagnosisImg from '../../../image/diagnosis.png';
import './DocumentStyle.css';
import axios from 'axios';
import summarizeContent from '../api/summarize';

const ChatSummary = () => {
    const [logList, setLogList] = useState([]);
    const nav = useNavigate();
    const [query, setQuery] = useSearchParams();
    const roomcode = query.get("roomcode");
    const [loading, setLoading] = useState(true); // 요약본 생성 중인지 여부
    const [summarizedMessages, setSummarizedMessages] = useState({ summarizedUserMessage: "", summarizedCounselorMessage: "" });

    // 포인트 사용
    const [donationAmount, setDonationAmount] = useState(500);
    const usercode = sessionStorage.getItem("usercode");

    const pointUse = () => {
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
                            Swal.fire({
                                icon: 'warning',
                                html: '포인트가 부족합니다.',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#FF7170'
                            })
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                html: '진단서가 발급되었습니다.',
                                confirmButtonText: '확인',
                                confirmButtonColor: '#5279FD'
                            }).then(() => {
                                nav('../diagnosis?chatroomcode=' + roomcode);
                            });
                        }
                    })
            }
        });
    }

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

    const summary = async () => {
        try {
            const response = await axios.get("/chat/summary?chatroomcode=" + roomcode);
            console.log("로그 불러오려고 함");
            console.log(response);
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

        console.log("지금 보내고자 하는 로그");
        console.log(chatlog);

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
                console.log("요약본 있음")
                console.log(response)
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
    }, []);

    return (
        <div className='mx_30'>
            <div className='mt-1 fs_14'>
                <Link to="/user/chat" className='col_blue2'>TODAC 채팅 {'>'} </Link>
                <Link to="/user/chat/counsel" className='col_blue2'>상담 받기 {'>'} </Link>
                <Link to="/user/chat/summary" className='col_blue2'>요약</Link>
            </div>
            <div className='fs_25 fw_700'>오늘의 상담 요약</div>
            <br /><br />
            <div className='fs_20 fw_700'>내 고민 요약</div>
            <div className='summaryContent fs_14 bor_red bg_red mt_10'>
                {summarizedMessages.summarizedUserMessage?.content}
            </div>
            <br />
            <div className='fs_20 fw_700'>상담사의 답변 요약</div>
            <div className='summaryAnswerContent fs_14 bor_blue1 bg_blue mt_10'>
                {summarizedMessages.summarizedCounselorMessage?.content}
            </div>
            <br /><br />
            <div style={{ textAlign: 'center' }}>
                <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../../')}>마이 홈 이동하기</button>
                &nbsp;&nbsp;
                <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => {
                    pointUse();
                }}>진단서 발급(500P)</button>
                &nbsp;&nbsp;
                <span role="img" aria-label="info-icon" className="info-icon" style={{ cursor: 'pointer' }} onClick={handleInfoClick}>ℹ️</span>
            </div>
        </div>
    );
};

export default ChatSummary;
