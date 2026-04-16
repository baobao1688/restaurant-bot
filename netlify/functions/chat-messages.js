// Vercel/Netlify Serverless Function: 获取AI回复
module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    const { chat_id, conversation_id } = req.body;
    
    try {
        const response = await fetch(`https://api.coze.cn/v3/chat/message/list?chat_id=${chat_id}&conversation_id=${conversation_id}`, {
            headers: {
                'Authorization': `Bearer ${process.env.COZE_API_TOKEN}`,
            }
        });
        
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
