// Netlify Serverless Function: 获取AI回复
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    const body = JSON.parse(event.body || '{}');
    const { chat_id, conversation_id } = body;
    
    try {
        const response = await fetch(`https://api.coze.cn/v3/chat/message/list?chat_id=${chat_id}&conversation_id=${conversation_id}`, {
            headers: {
                'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
            }
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
