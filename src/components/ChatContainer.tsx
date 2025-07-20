import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import UserMessage from './UserMessage';
import AssistantMessage from './AssistantMessage';
import FallbackMessage from './FallbackMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chatApi';
// import WelcomeScreen from './WelcomeScreen'; // Not used, can be re-enabled if needed

const ChatContainer: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');

  const {
    messages,
    isLoading,
    addMessage,
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

    try {
      const aiResponse = await chatService.sendMessage(content);
      addMessage({
        id: Date.now().toString(),
        type: 'assistant',
        content: aiResponse.answer ?? '',
        timestamp: new Date(),
        confidence: aiResponse.confidence,
        contexts: aiResponse.contexts,
        processingTime: aiResponse.processingTime,
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
        <div className="container max-w-2xl mx-auto">
          {messages.map((msg, idx) => {
            const isLastAssistant =
              msg.type === 'assistant' &&
              idx === messages.length - 1 &&
              typeof msg.confidence === 'number' &&
              msg.confidence < 0.5;
            if (msg.type === 'user') {
              return <UserMessage key={msg.id} message={msg} onCopy={text => navigator.clipboard.writeText(text)} />;
            }
            return (
              <React.Fragment key={msg.id}>
                <AssistantMessage message={msg} onCopy={text => navigator.clipboard.writeText(text)} />
                {isLastAssistant && (
                  <FallbackMessage message="AI가 명확한 답변을 찾지 못했습니다. 질문을 더 구체적으로 입력해 주세요." />
                )}
              </React.Fragment>
            );
          })}
          {isLoading && (
            <div className="flex justify-center items-center py-6">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.45s' }}></div>
                </div>
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  AI가 답변을 생성하고 있습니다...
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 p-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              onSend={handleSend}
              isLoading={isLoading}
            />
            {/* 추가 UI 요소 (새 채팅, 내보내기 등) */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChatContainer;