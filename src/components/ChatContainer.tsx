import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Bot } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chatApi';
import WelcomeScreen from './WelcomeScreen';

const ChatContainer: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [showWelcome, setShowWelcome] = useState(true);
  
  const {
    messages,
    questionType,
    isLoading,
    addMessage,
    setQuestionType,
    setIsLoading,
  } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const isConnected = await chatService.healthCheck();
        setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      } catch (error) {
        setConnectionStatus('disconnected');
      }
    };
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (content: string) => {
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content,
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setIsLoading(true);
    setShowWelcome(false);
    try {
      const response = await chatService.sendMessage(content);
      addMessage({
        id: Date.now().toString(),
        type: 'assistant',
        content: response.answer,
        timestamp: new Date(),
        contexts: response.contexts,
        confidence: response.confidence,
        processingTime: response.processingTime,
      });
      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('disconnected');
      addMessage({
        id: Date.now().toString(),
        type: 'assistant',
        content: `죄송합니다. 서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.`,
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 새 채팅 시작 함수 (향후 사용 예정)
  // const handleNewChat = () => {
  //   clearMessages();
  //   setShowWelcome(true);
  // };

  return (
    <div className="flex flex-col h-full relative">
      {connectionStatus === 'disconnected' && (
        <div className="bg-red-100 border-b border-red-200 dark:bg-red-900/30 dark:border-red-800 px-4 py-2.5">
          <div className="container mx-auto flex items-center space-x-3 text-sm text-red-700 dark:text-red-300">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">서버 연결이 끊어졌습니다. 잠시 후 자동으로 재연결됩니다.</span>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {showWelcome && messages.length === 0 ? (
            <WelcomeScreen 
              questionType={questionType} 
              setQuestionType={setQuestionType} 
            />
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message}
                  onCopy={(text) => navigator.clipboard.writeText(text)}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-8">
                  <div className="max-w-[85%] lg:max-w-[75%]">
                    <div className="flex items-start space-x-3 mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 shadow-soft">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 pt-1">
                        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                          AI 어시스턴트
                        </span>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl rounded-tl-md shadow-soft border border-neutral-200 dark:border-neutral-700">
                      <div className="px-5 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce"></div>
                            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                          </div>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            AI가 답변을 생성하고 있습니다...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSend}
              questionType={questionType}
              isLoading={isLoading}
            />
            {/* 추가 UI 요소 (새 채팅, 내보내기 등) */}
            {/* <div className="mt-4 flex justify-center items-center space-x-4">
              <button onClick={handleNewChat} className="flex items-center space-x-2 text-xs text-neutral-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <RotateCcw className="h-3.5 w-3.5" />
                <span>새 채팅</span>
              </button>
              <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-600"></div>
              <button onClick={handleExport} className="flex items-center space-x-2 text-xs text-neutral-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <Download className="h-3.5 w-3.5" />
                <span>대화 내보내기</span>
              </button>
              <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-600"></div>
              <button className="flex items-center space-x-2 text-xs text-neutral-500 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                <History className="h-3.5 w-3.5" />
                <span>이력 조회</span>
              </button>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatContainer;