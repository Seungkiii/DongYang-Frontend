import React from 'react';
import { Bot, Copy } from 'lucide-react';
import { formatTime, getConfidenceLabel } from '../lib/utils';
import type { Message } from '../types/chat';

interface AssistantMessageProps {
  message: Message;
  onCopy?: (text: string) => void;
}

const ConfidenceBadge: React.FC<{ confidence?: number }> = ({ confidence }) => {
  if (confidence === undefined) return null;
  const percent = Math.round(confidence * 100);
  const color =
    confidence >= 0.8
      ? 'bg-green-500'
      : confidence >= 0.6
      ? 'bg-yellow-400'
      : 'bg-red-500';
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-24 h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <span className={`text-xs font-semibold ${color === 'bg-red-500' ? 'text-red-600' : color === 'bg-yellow-400' ? 'text-yellow-700' : 'text-green-700'}`}>{percent}% ({getConfidenceLabel(confidence)})</span>
    </div>
  );
};

const AssistantMessage: React.FC<AssistantMessageProps> = ({ message, onCopy }) => (
  <div className="flex justify-start mb-6 animate-slide-in-left">
    <div className="max-w-[85%] lg:max-w-[70%]">
      <div className="flex items-start space-x-3 mb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 shadow-md">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              AI 어시스턴트
            </span>
            <ConfidenceBadge confidence={message.confidence} />
            <span className="text-xs text-neutral-500 dark:text-neutral-400">{formatTime(message.timestamp)}</span>
            <button
              onClick={() => onCopy?.(message.content)}
              className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
              aria-label="메시지 복사"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-2xl rounded-bl-none px-5 py-3 shadow-soft">
            <div className="text-base leading-relaxed whitespace-pre-wrap">
              {message.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AssistantMessage;
