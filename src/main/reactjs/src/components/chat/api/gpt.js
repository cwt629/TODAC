import axios from "axios";

export default async function getGPTResponse(userMessage, systemMessage, log = []) {
    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { 'role': 'system', 'content': systemMessage },
                ...log.map((data) => ({ 'role': data.role, 'content': data.content })),
                { 'role': 'user', 'content': userMessage }
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
    // 반환 방식: {role: 'assistant', content: 답변}
    return response.data.choices[0].message;

    // 아래는 기존에 했던 방식인데, input과 loading 상태가 답변이 불러와진 뒤 변경되도록 하기 위해 위와 같이 변경함.

    // axios.post(
    //     'https://api.openai.com/v1/chat/completions',
    //     {
    //         model: 'gpt-3.5-turbo',
    //         messages: [
    //             { 'role': 'system', 'content': systemMessage },
    //             ...log,
    //             { 'role': 'user', 'content': userMessage }
    //         ],
    //         temperature: 1,
    //         max_tokens: 400,
    //         top_p: 1,
    //         frequency_penalty: 0,
    //         presence_penalty: 0
    //     },
    //     {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    //         }
    //     }
    // ).then(result => {
    //     alert("잘 됐다!");
    //     console.log(result);
    //     // setLog([...log,
    //     // { 'role': 'user', 'content': userMessage },
    //     // result.data.choices[0].message
    //     // ]);

    //     // return true;
    // }).catch(err => {
    //     alert("ChatGPT Error났음");
    //     console.log(err);
    // })
}