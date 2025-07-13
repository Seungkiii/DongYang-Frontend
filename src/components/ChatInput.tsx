import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, X } from 'lucide-react';
import type { QuestionType } from '../types/chat';

const SUGGESTED_QUESTIONS = {
  '설계추천': [
    '30대 여성 직장인 암보험 추천',
    '월 10만원 이하 실비보험',
    '40대 남성 종신보험 설계',
  ],
  '질의응답': [
    '유방암 보장 여부',
    '실손보험 중복가입 조건',
    '보험금 청구 필요 서류',
  ],
};

interface ChatInputProps {
  onSend: (message: string) => void;
  onCancel?: () => void;
  questionType: QuestionType;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  onCancel, 
  questionType, 
  isLoading, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestions = SUGGESTED_QUESTIONS[questionType];

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    } else if (e.key === 'Escape') {
      if (isLoading && onCancel) {
        onCancel();
      }
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`; // max height 160px
    }
  }, [message]);

  return (
    <div className="w-full">
      {/* 추천 질문 */}
      {!isLoading && message.length === 0 && (
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-neutral-600 dark:text-neutral-400 mr-2">추천 질문:</span>
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setMessage(suggestion)}
              className="px-4 py-2 rounded-full bg-secondary-50 dark:bg-secondary-900/50 text-secondary-700 dark:text-secondary-300 text-sm hover:bg-secondary-100 dark:hover:bg-secondary-900 transition-colors shadow-sm"
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      
      {/* 입력창 카드 */}
      <div className="relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center space-x-2">
          <button className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" aria-label="파일 첨부">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" aria-label="음성 입력">
            <Mic className="h-5 w-5" />
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={questionType === '설계추천'
            ? '고객 정보(나이, 성별, 직업 등)와 함께 보험 설계를 요청해주세요...'
            : '보험 약관이나 상품에 대해 질문해주세요...'}
          className="w-full resize-none rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 pl-24 pr-16 py-4 text-base text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-secondary-500 shadow-sm transition-shadow duration-300"
          rows={1}
          disabled={disabled || isLoading}
          style={{ minHeight: '56px' }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-3">
          {isLoading ? (
            <button
              onClick={onCancel}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-md"
              aria-label="전송 중단"
            >
              <X className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!message.trim() || disabled}
              className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300 shadow-md transform active:scale-95
                ${message.trim() && !disabled 
                  ? 'bg-secondary-500 hover:bg-secondary-600 text-white' 
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'}`}
              aria-label="메시지 전송"
              type="button"
            >
              <Send className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};