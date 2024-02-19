import axios from "axios";

/**
 * 사용자의 채팅 로그를 기반으로 심리 분석을 수행하는 함수
 * @param {array} log 사용자의 채팅 로그
 * @returns {string} 심리 분석 결과
 */
async function analyzePsychology(log) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    // 여기에 시스템 메시지 추가
                    { 'role': 'system', 'content': '이 내용은 당신이 사용자와 나눈 심리 상담 내용입니다. 여기서 사용자의 고민을 토대로 심리 분석을 해주세요. 최대한 자세하게 심리 분석을 해주세요.' },
                    // 사용자의 채팅 로그 추가
                    ...log.map((data) => ({ 'role': data.speaker > 0 ? 'assistant' : 'user', 'content': data.content }))
                ],
                temperature: 0.1,
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

        return response.data.choices[0].message; // 심리 분석 결과를 반환
    } catch (error) {
        console.error("심리 분석 중 오류가 발생했습니다:", error);
        return "심리 분석 중 오류가 발생했습니다.";
    }
}

export default analyzePsychology;
