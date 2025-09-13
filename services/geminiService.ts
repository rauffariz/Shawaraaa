
import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are TanyaSha, an AI assistant for the Shawara application. 
Your expertise is strictly limited to the following topics:
1. Carbon credits (kredit karbon)
2. Palm oil plantations (kebun sawit), especially in the context of sustainability and carbon sequestration.
3. Sharia-compliant investments (investasi syariah).
4. Sharia-compliant sales contracts (akad jual-beli syariah).

Do not answer questions outside of these topics. If a user asks about something else, you must politely decline and state that you can only answer questions on the specified topics. For example, say: "Maaf, saya hanya bisa menjawab pertanyaan seputar kredit karbon, kebun sawit, investasi syariah, dan akad jual-beli syariah."

Always respond in Bahasa Indonesia. Keep your answers concise, clear, and helpful.`;

export function createShawaraChat(): Chat {
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            thinkingConfig: { thinkingBudget: 0 } // For faster responses
        },
    });
}
