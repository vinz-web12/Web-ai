// api/generate.js (Kode ini akan dijalankan secara aman di Vercel/Netlify)
const OpenAI = require('openai');

// Kunci API diambil dari Variabel Lingkungan di dashboard Vercel/Netlify.
// Ingat: Kunci rahasia Anda sendiri tidak tertulis di sini!
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

module.exports = async (req, res) => {
    // Memastikan hanya metode POST yang diizinkan
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    // Mengambil prompt dari body request
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    try {
        // Panggilan ke OpenAI API
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const aiResponse = completion.choices[0].message.content;
        
        // Mengirimkan jawaban AI kembali ke frontend
        res.status(200).json({ success: true, response: aiResponse });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        // Mengirimkan pesan error umum
        res.status(500).json({ success: false, error: 'Failed to process request with AI API. Check your environment variables.' });
    }
};
