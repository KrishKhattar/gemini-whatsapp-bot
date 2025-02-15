import { initializeAI, AI_CONFIG } from '../config/geminiconfig.js';

export const generateReply = async (userMessage) => {
    try {
        const model = initializeAI();
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: "User interacting with the model, expecting Krish's responses." }]
                },
                {
                    role: 'model',
                    parts: [{ text: AI_CONFIG.masterPrompt }]
                }
            ]
        });

        // Send user message and get response
        const result = await chat.sendMessage(userMessage);
        const response = result.response;
        return response.text();

    } catch (error) {
        console.error('Gemini API Error:', error.message);
        throw new Error("Failed to generate a reply.");
    }
};