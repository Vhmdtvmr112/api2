const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware لتمرير بيانات الـ JSON لو حبيت تستخدم POST بعدين
app.use(express.json());

// الـ Route الأساسي اللي هيطلب من الـ API
app.get('/ask', async (req, res) => {
    try {
        // بناخد السؤال من الـ query parameter اللي اسمه text
        // مثال: /ask?text=من هو لوفي؟
        const userQuery = req.query.text;

        if (!userQuery) {
            return res.status(400).json({ 
                error: "برجاء كتابة السؤال في الـ query parameter مثل: /ask?text=your_question" 
            });
        }

        // الـ URL بتاع الـ API اللي هيبعتله السيرفر
        const apiUrl = `https://luffy-gpt-tau.vercel.app/api/ai/gpt?q=${encodeURIComponent(userQuery)}`;

        // إرسال الطلب للـ API الخارجية
        const response = await axios.get(apiUrl);

        // الرد بالبيانات اللي رجعت من الـ API مباشرة للـ client
        res.json(response.data);

    } catch (error) {
        console.error("حدث خطأ أثناء الاتصال بالـ API:", error.message);
        
        // التعامل مع الأخطاء بشكل نضيف
        res.status(500).json({ 
            error: "فشل السيرفر في الحصول على رد من الـ API الخارجية",
            details: error.message 
        });
    }
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`السيرفر شغال دلوقتي على الرابط: http://localhost:${PORT}`);
});