export type MessageType = 'user' | 'assistant';
export type QuestionType = '질의응답' | '설계추천';

export interface ChatRequest {
  question: string;
}

export interface ChatResponse {
  answer: string;
  contexts?: string[]; // 답변 근거 (선택 사항)
  confidence?: number; // 답변 신뢰도 (0.0 ~ 1.0)
  processingTime?: number; // 답변 처리 시간 (밀리초)
}

export interface ChatHistory {
  id: string; // 백엔드에서 관리하는 이력 ID
  question: string; // 사용자 질문
  answer: string; // AI 답변
  timestamp: string; // ISO 8601 형식의 시간 (예: "2023-10-27T10:00:00Z")
  contexts?: string[];
  confidence?: number;
}

// 프론트엔드에서 사용할 메시지 타입 (UI 렌더링용)
export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date; // Date 객체로 변환하여 사용
  contexts?: string[];
  confidence?: number;
  processingTime?: number;
}