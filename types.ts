
import type { Chat } from '@google/genai';

export type ActiveScreen = 'Community' | 'Update' | 'Market' | 'Point';

export interface ChatMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface GeminiChatSession {
    history: ChatMessage[];
    chat: Chat;
}

export interface Article {
    id: number;
    title: string;
    source: string;
    time: string;
    image: string;
    summary: string;
}

export interface CommunityPost {
    id: number;
    author: string;
    avatar: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
}

export interface Course {
    id: number;
    title: string;
    instructor: string;
    duration: string;
    thumbnail: string;
}

export interface PointTransaction {
    id: number;
    description: string;
    points: number;
    date: string;
}

export interface DonationCampaign {
    id: number;
    title: string;
    description: string;
    goal: number;
    raised: number;
    image: string;
}

export interface MarketData {
    name: string;
    price: number;
}
