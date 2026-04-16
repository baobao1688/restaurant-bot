// Netlify Serverless Function: 代理扣子API请求
const COZE_API_URL = 'https://api.coze.cn/v3/chat';

exports.handler = async (event, context) => {
    // 只允许POST请求
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const { message, bot_id } = body;

        // 调用扣子API
        const response = await fetch(COZE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bot_id: bot_id || '7629219190532014116',
                user_id: 'web_user_' + Date.now(),
                stream: false,
                auto_save_history: true,
                additional_messages: [{
                    role: 'user',
                    content: message,
                    content_type: 'text'
                }]
            })
        });

        const data = await response.json();
        
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
