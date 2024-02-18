import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './DocumentStyle.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import summarizeContent from '../api/summarize';

const ChatDiagnosis = () => {
    const [summaryList, setSummaryList] = useState([]);
    const nav = useNavigate();
    const [query, setQuery] = useSearchParams();
    const roomcode = query.get("chatroomcode");
    const [loading, setLoading] = useState(true); // 요약본 생성 중인지 여부
    const [summarizedMessages, setSummarizedMessages] = useState({ summarizedUserMessage: "", summarizedCounselorMessage: "" });

    console.log("roomcode:" + roomcode);

    const summaryDB = async () => {
        try {
            const response = await axios.get("/chat/diagnosis?chatroomcode=" + roomcode);
            console.log("요약 내용 DB에서 불러옴");
            console.log(response);
            setSummaryList(response.data);
            const { summarizedUserMessage, summarizedCounselorMessage } = await summarizeMessages(response.data);
            setSummarizedMessages({ summarizedUserMessage, summarizedCounselorMessage });
            await saveSummarizedMessages(summarizedUserMessage, summarizedCounselorMessage);
        } catch (error) {
            console.error('Error fetching summary list:', error);
        }
    };

    // 요약 내용을 DB에서 불러옴
    const summarizeMessages = async (chatlog) => {
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

        console.log("지금 보내고자 하는 로그");
        console.log(chatlog);
        const chatLogAnswer = chatlog[0].answer;
        const chatLogWorry = chatlog[0].worry;

        console.log(chatLogAnswer);
        console.log(chatLogWorry);
        Swal.close(); // 진단서 제작이 완료되면 알림창 닫기

        return { chatLogWorry, chatLogAnswer };
    };

    const getSummarizedMessages = async () => {
        await summaryDB();
    };

    const saveSummarizedMessages = async (chatLogWorry, chatLogAnswer) => {
        await axios({
            method: 'post',
            url: "/chat/diagnosis/save?chatroomcode=" + roomcode,
            data: {
                worry: chatLogWorry,
                answer: chatLogAnswer
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
                console.log("진단서 있음")
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
            <br /><br />
            <div className='fs_20 fw_700'>내 고민 요약</div>
            <div className='diagnosisSummaryContent fs_14 bor_red bg_red mt_10'>
                {summarizedMessages.chatLogWorry}
            </div>
            <br />
            <div className='fs_20 fw_700'>상담사의 답변 요약</div>
            <div className='diagnosisSummaryAnswerContent fs_14 bor_blue1 bg_blue mt_10'>
                {summarizedMessages.chatLogAnswer}
            </div>
            <br />
            <div className='fs_20 fw_700'>심리 분석</div>
            <div className='diagnosisPsychology fs_14 bor_blue1 bg_blue mt_10'>심리 분석 내용</div>
            <br />
            <div className='fs_20 fw_700'>고민이 계속될 땐, 이렇게 해보세요 🤗</div>
            <div className='diagnosisActing fs_14 bor_blue1 bg_blue mt_10'>한강 가서 사람들 지켜보기, 클라이밍, 등산</div>
            <br />
            <div style={{ textAlign: 'center' }}>
                <button className='btn bor_blue1 bg_blue' style={{ color: '#536179' }} onClick={() => nav('../../')}>마이 홈 이동하기</button>
            </div>
        </div>
    );
};

export default ChatDiagnosis;