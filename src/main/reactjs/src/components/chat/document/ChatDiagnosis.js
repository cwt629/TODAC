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
    const [analyzedMessages, setAnalyzedMessages] = useState("");


    console.log("roomcode:" + roomcode);

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

    const analyzePsychology = async () => {
        try {
            const response = await axios.get("/chat/summary?chatroomcode=" + roomcode);
            console.log("심리 분석 로그 불러오려고 함");
            console.log(response);
            setLogList(response.data);
            const analyzedUserMessage = await analyzeMessages(response.data);
            setAnalyzedMessages(analyzedUserMessage.content);
            await saveSummarizedMessages(analyzedUserMessage.content);
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

    // 사용자의 고민 내용을 바탕으로 심리 분석
    const analyzeMessages = async (chatlog) => {
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

        console.log(analyzeUserLog);

        const analyzedUserMessage = await summarizeContent(
            analyzeUserLog,
            "이 내용은 당신이 사용자와 나눈 심리 상담 내용입니다. 여기서 사용자의 고민을 토대로 심리 분석을 해주면 됩니다. 최대한 자세하게 심리 분석을 하되, 글자 수는 300자를 넘지 않게 해주세요."
        );

        Swal.close(); // 진단서 제작이 완료되면 알림창 닫기

        return analyzedUserMessage;
    };



    const getSummarizedMessages = async () => {
        await summaryDB();
    };

    const getanalyzedMessages = async () => {
        await analyzePsychology();
    };

    const saveSummarizedMessages = async (analyzedUserMessage) => {
        console.log("심리 분석 내용");
        console.log(analyzedUserMessage);
        await axios({
            method: 'post',
            url: "/chat/diagnosis/save?chatroomcode=" + roomcode,
            data: {
                deepanswer: analyzedUserMessage,
                advice: "임시 advice"
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const checkData = async () => {
        try {
            const response = await axios.get("/chat/diagnosis/check?chatroomcode=" + roomcode);
            getSummarizedMessages();
            if (response.data) {
                console.log("진단서 있음")
                console.log(response)
                setAnalyzedMessages(response.data.deepanswer);
            }
            else {
                getanalyzedMessages();
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
                {summarizedMessages.summarizedUserMessage}
            </div>
            <br />
            <div className='fs_20 fw_700'>상담사의 답변 요약</div>
            <div className='diagnosisSummaryAnswerContent fs_14 bor_blue1 bg_blue mt_10'>
                {summarizedMessages.summarizedCounselorMessage}
            </div>
            <br />
            <div className='fs_20 fw_700'>심리 분석</div>
            <div className='diagnosisPsychology fs_14 bor_blue1 bg_blue mt_10'>
                {analyzedMessages}
            </div>
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