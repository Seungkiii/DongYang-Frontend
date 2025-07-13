import { create } from 'zustand';
import type { Message, QuestionType } from '../types/chat';

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  questionType: QuestionType;
  isDarkMode: boolean;
  addMessage: (message: Message) => void;
  setIsLoading: (loading: boolean) => void;
  setQuestionType: (type: QuestionType) => void;
  toggleDarkMode: () => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  questionType: '질의응답', // 기본 질문 타입
  isDarkMode: false, // 기본 다크 모드 비활성화
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message],
  })),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setQuestionType: (type) => set({ questionType: type }),
  toggleDarkMode: () => set((state) => ({
    isDarkMode: !state.isDarkMode,
  })),
  clearMessages: () => set({ messages: [] }),
}));