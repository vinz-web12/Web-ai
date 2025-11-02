// api/generate.js (Dioptimalkan untuk Google Gemini API)

const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ 
  // Sekarang mencari variabel GEMINI_API_KEY
  apiKey: process.env.GEMINI_API_KEY
});

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    try {
        // Menggunakan model Gemini 
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            contents: prompt,
        });

        const aiResponse = response.text;
        
        res.status(200).json({ success: true, response: aiResponse });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ success: false, error: 'Gagal terhubung ke Gemini API. Pastikan GEMINI_API_KEY sudah benar di Vercel.' });
    }
};
