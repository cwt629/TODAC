import axios from "axios";

export default function getGPTResponse(userMessage, systemMessage, setLog, log = []) {
    axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
            model: 'gpt-3.5-turbo',
            messages: [
                { 'role': 'system', 'content': systemMessage },
                ...log,
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
    ).then(result => {
        alert("잘 됐다!");
        console.log(result);
        setLog([...log,
        { 'role': 'user', 'content': userMessage },
        result.data.choices[0].message
        ]);
    }).catch(err => {
        alert("ChatGPT Error났음");
        console.log(err);
    })
}