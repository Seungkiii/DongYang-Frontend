import React from 'react';
import { Copy, User } from 'lucide-react';
import { formatTime } from '../lib/utils';
import type { Message } from '../types/chat';

interface UserMessageProps {
  message: Message;
  onCopy?: (text: string) => void;
}

const UserMessage: React.FC<UserMessageProps> = ({ message, onCopy }) => (
  <div className="flex justify-end mb-6 animate-slide-in-right">
    <div className="max-w-[85%] lg:max-w-[70%]">
      <div className="flex items-end justify-end space-x-2 mb-2">
        <div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>{formatTime(message.timestamp)}</span>
          <button
            onClick={() => onCopy?.(message.content)}
            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
            aria-label="메시지 복사"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary-500 shadow-md">
          <User className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="bg-secondary-500 text-white rounded-2xl rounded-br-none px-5 py-3 shadow-soft">
        <div className="text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    </div>
  </div>
);

export default UserMessage;
