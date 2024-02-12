import axios from "axios";

/**
 * GPT API로부터 답변을 받아오는 함수
 * @param {string} systemMessage GPT에게 대입할 시스템 메세지(ex. 당신은 ~한 상담사입니다.)
 * @param {Object} log 로그 객체(현재 보내려는 메세지를 포함한 메세지 데이터들)
 * @param {'assistant'|'user'} log.role 로그 내 role (GPT: assistant, 사용자나 본인: user) - system은 없음
 * @param {string} log.content 로그 내 content : 채팅 내용
 * @param {Object=} log.extraKey 로그 내 다른 내용들(있어도 되고 없어도 됨)
 * @returns {Object} 받은 데이터: {role: 'assistant', content: '답변'} 형태
 */
export default async function getGPTResponse(systemMessage, log = []) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { 'role': 'system', 'content': systemMessage },
                ...log.map((data) => ({ 'role': data.role, 'content': data.content }))
            ],
            temperature: 1,
            max_tokens: 400,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            }
        }
    );

    alert("답변 완료!");
    console.log(log);
    console.log(response);

    return response.data.choices[0].message; // 반환 방식: {role: 'assistant', content: 답변}
}