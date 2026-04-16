// Vercel/Netlify Serverless Function: 代理扣子API请求
const COZE_API_URL = 'https://api.coze.cn/v3/chat';

module.exports = async (req, res) => {
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, bot_id } = req.body;

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
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
