import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Clock, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Bot,
  Copy,
  ExternalLink
} from 'lucide-react';
import { cn, formatTime, getConfidenceColor, getConfidenceLabel } from '../lib/utils';
import type { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
  onCopy?: (text: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onCopy
}) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContexts, setShowContexts] = useState(false);
  const isUser = message.type === 'user';

  // 타이핑 애니메이션 효과 (AI 메시지만)
  useEffect(() => {
    if (!isUser && message.content && !displayedContent) {
      setIsTyping(true);
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < message.content.length) {
          setDisplayedContent(message.content.slice(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    } else if (!isUser && message.content && displayedContent !== message.content) {
      // 메시지 내용이 업데이트되었을 때 (예: 스트리밍 완료 후 최종 내용)
      setDisplayedContent(message.content);
      setIsTyping(false);
    } else if (isUser) {
      setDisplayedContent(message.content);
    }
  }, [message.content, isUser]);

  const handleCopy = () => {
    if (onCopy) {
      onCopy(message.content);
    } else {
      navigator.clipboard.writeText(message.content);
    }
  };

  if (isUser) {
    return (
      <div className="flex justify-end mb-6 animate-slide-in-right">
        <div className="max-w-[85%] lg:max-w-[70%]">
          <div className="flex items-end justify-end space-x-2 mb-2">
            <div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span>{formatTime(message.timestamp)}</span>
              <button
                onClick={handleCopy}
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
  }

  return (
    <div className="flex justify-start mb-6 animate-slide-in-left">
      <div className="max-w-[85%] lg:max-w-[70%]">
        {/* AI 헤더 */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 shadow-md">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                AI 어시스턴트
              </span>
              {message.confidence !== undefined && (
                <div className={cn("flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-full", getConfidenceColor(message.confidence))}>
                  {message.confidence >= 0.8 ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : message.confidence >= 0.6 ? (
                    <AlertTriangle className="h-3.5 w-3.5" />
                  ) : (
                    <Info className="h-3.5 w-3.5" />
                  )}
                  <span>
                    {Math.round(message.confidence * 100)}%
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400">
                    ({getConfidenceLabel(message.confidence)})
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{formatTime(message.timestamp)}</span>
              {message.processingTime && (
                <>
                  <span>•</span>
                  <span>{(message.processingTime / 1000).toFixed(1)}초</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* AI 메시지 내용 */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-none shadow-soft border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="px-5 py-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                components={{
                  code({ children, className }) {
                    return (
                      <code className={cn(
                        "bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-sm font-mono",
                        className
                      )}>
                        {children}
                      </code>
                    );
                  },
                  pre({ children }) {
                    return (
                      <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto my-3 text-sm">
                        {children}
                      </pre>
                    );
                  },
                  p({ children }) {
                    return <p className="mb-3 last:mb-0 text-neutral-800 dark:text-neutral-200 leading-relaxed">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="list-disc pl-5 mb-3 space-y-1.5">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="list-decimal pl-5 mb-3 space-y-1.5">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="text-neutral-800 dark:text-neutral-200">{children}</li>;
                  },
                  strong({ children }) {
                    return <strong className="font-semibold text-neutral-900 dark:text-neutral-50">{children}</strong>;
                  },
                  a({ children, href }) {
                    return (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-secondary-600 dark:text-secondary-400 hover:underline inline-flex items-center space-x-1"
                      >
                        <span>{children}</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    );
                  },
                }}
              >
                {displayedContent}
              </ReactMarkdown>
              {isTyping && (
                <span className="inline-block w-1.5 h-4 bg-primary-500 animate-blink ml-1 rounded-full"></span>
              )}
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex items-center justify-between px-5 py-2.5 border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/50">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              <span>복사</span>
            </button>
            
            {message.contexts && message.contexts.length > 0 && (
              <button
                onClick={() => setShowContexts(!showContexts)}
                className="flex items-center space-x-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>근거 보기</span>
                <span className="text-xs bg-neutral-200 dark:bg-neutral-600 px-2 py-0.5 rounded-full font-medium">
                  {message.contexts.length}
                </span>
                {showContexts ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>

          {/* 컨텍스트 정보 */}
          {showContexts && message.contexts && message.contexts.length > 0 && (
            <div className="border-t border-neutral-100 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-700/50">
              <div className="px-5 py-4 space-y-3">
                {message.contexts.map((context, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-neutral-800 rounded-lg p-4 border-l-4 border-primary-500 shadow-sm"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-white text-sm font-medium flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                          약관 조항 #{index + 1}
                        </div>
                        <div className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap font-mono">
                          {context}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};