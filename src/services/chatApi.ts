import axios from 'axios';
import type { ChatRequest, ChatResponse } from '../types/chat';

// 프로덕션에서는 nginx 프록시 사용, 개발 환경에서는 localhost 사용
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 
  (window.location.hostname === 'localhost' ? 'http://localhost:8080/api' : '/api');

const chatApiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatService = {
  /**
   * 백엔드 헬스 체크
   */
  healthCheck: async (): Promise<boolean> => {
    try {
      const response = await chatApiClient.get('/chat/test');
      console.log('Health check response:', response.data);
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  },

  /**
   * 챗봇에게 질문 전송
   * @param question 사용자 질문
   */
  sendMessage: async (question: string): Promise<ChatResponse> => {
    const requestBody: ChatRequest = { question };
    const startTime = Date.now();
    try {
      const response = await chatApiClient.post<ChatResponse>('/chat', requestBody);
      const endTime = Date.now();
      return {
        ...response.data,
        processingTime: endTime - startTime, // 처리 시간 추가
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  /**
   * 채팅 이력 조회
   */
  getChatHistory: async (): Promise<ChatResponse[]> => { // ChatHistory 대신 ChatResponse[]로 반환하도록 수정
    try {
      const response = await chatApiClient.get<ChatResponse[]>('/chat/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },
};