import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onCancel?: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  isLoading, 
  disabled = false 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div className="flex items-end space-x-2 p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="flex-1 flex items-end space-x-2">
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all min-h-[40px] max-h-40"
          rows={1}
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="메시지를 입력하세요..."
          disabled={isLoading || disabled}
          aria-label="메시지 입력"
        />
        
        <div className="flex items-center space-x-1">
          <button 
            className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" 
            aria-label="파일 첨부"
            disabled={isLoading || disabled}
          >
            <Paperclip className="h-5 w-5" />
          </button>
          
          <button 
            className="h-8 w-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors" 
            aria-label="음성 입력"
            disabled={isLoading || disabled}
          >
            <Mic className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleSend}
            disabled={isLoading || !message.trim() || disabled}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow transition-colors disabled:bg-neutral-300 dark:disabled:bg-neutral-700 disabled:cursor-not-allowed"
            aria-label="보내기"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};