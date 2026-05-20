const axios = require('axios');

module.exports = async (req, res) => {
    const userQuestion = req.query.question;

    if (!userQuestion) {
        return res.status(400).json({ 
            error: 'من فضلك اكتب السؤال كده: ?question=سؤالك' 
        });
    }

    try {
        const apiUrl = `https://luffy-gpt-tau.vercel.app/api/ai/gpt?q=${encodeURIComponent(userQuestion)}`;
        const response = await axios.get(apiUrl);

        res.json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: 'حصلت مشكلة في السيرفر' 
        });
    }
};