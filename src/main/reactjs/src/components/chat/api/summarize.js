import axios from "axios";

/**
 * GPT API로부터 내용을 요약하는 함수
 * @param {string} content 요약할 내용
 * @param {string} systemMessage GPT에게 대입할 시스템 메세지(ex. 당신은 ~한 상담사입니다.)
 * @returns {string} 요약된 내용
 */
async function summarizeContent(content, systemMessage) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { 'role': 'system', 'content': systemMessage },
                    { 'role': 'user', 'content': content }
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

        return response.data.choices[0].message; // 요약된 내용을 반환
    } catch (error) {
        console.error("내용을 요약하는 도중 에러가 발생했습니다:", error);
        return "내용을 요약하는 도중 에러가 발생했습니다.";
    }
}

export default summarizeContent;
