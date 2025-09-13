
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { createShawaraChat } from '../services/geminiService';
import type { ChatMessage } from '../types';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);


export const TanyaSha: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatSession, setChatSession] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setChatSession(createShawaraChat());
        setMessages([
            { role: 'model', parts: [{ text: "Assalamualaikum! Saya TanyaSha. Ada yang bisa saya bantu seputar kredit karbon, kebun sawit, atau investasi syariah?" }] }
        ]);
    }, []);
    
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || !chatSession || isLoading) return;

        const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
        setMessages(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const stream = await chatSession.sendMessageStream({ message: userInput });
            
            let modelResponse = '';
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

            for await (const chunk of stream) {
                modelResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text: modelResponse }] };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Maaf, terjadi kesalahan. Silakan coba lagi." }] }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-20 right-4 md:bottom-6 md:right-6 bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 z-50 transition-transform transform hover:scale-110"
                aria-label="Open Chat"
            >
                <ChatIcon />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[90vh] max-h-[700px] flex flex-col overflow-hidden">
                <header className="flex items-center justify-between p-4 bg-green-600 text-white border-b">
                    <h2 className="text-xl font-bold">TanyaSha</h2>
                    <button onClick={() => setIsOpen(false)} className="hover:bg-green-700 rounded-full p-1">
                        <CloseIcon />
                    </button>
                </header>

                <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto bg-slate-50 custom-scrollbar">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`rounded-xl px-4 py-2 max-w-xs lg:max-w-md ${msg.role === 'user' ? 'bg-slate-200 text-slate-800' : 'bg-green-100 text-green-900'}`}>
                                <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start mb-4">
                            <div className="rounded-xl px-4 py-2 max-w-xs lg:max-w-md bg-green-100 text-green-900">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-75"></div>
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                    <div className="relative">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Tanya di sini..."
                            className="w-full pl-4 pr-12 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !userInput.trim()} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-green-600 disabled:text-slate-400 hover:text-green-700">
                           <SendIcon />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
