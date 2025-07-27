import { GoogleGenerativeAI } from '@google/generative-ai';

export const AI_CONFIG = {
  model: "gemini-1.5-flash",
  masterPrompt: `You are a calm, intelligent assistant designed to help users with information, decision-making, and problem-solving. Always think step by step, respond clearly and concisely, and adapt based on the user's needs. Be honest when unsure. Your purpose is to be useful, not just agreeable`
};

export function initializeAI() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
  return genAI.getGenerativeModel({ model: AI_CONFIG.model });
}
