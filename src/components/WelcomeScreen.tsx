import React from 'react';
import { MessageSquare, Sparkles, Bot } from 'lucide-react';
import type { QuestionType } from '../types/chat';

interface WelcomeScreenProps {
  questionType: QuestionType;
  setQuestionType: (type: QuestionType) => void;
}

interface ModeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
  color: string;
}

const ModeCard: React.FC<ModeCardProps> = ({ icon, title, description, active, onClick, color }) => (
  <button
    onClick={onClick}
    className={`p-8 rounded-2xl border-2 text-left transition-all duration-300 transform hover:-translate-y-1 
      ${active 
        ? `bg-${color}-50 dark:bg-${color}-900/20 border-${color}-500 shadow-lg` 
        : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 shadow-md'}`}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-${color}-100 dark:bg-${color}-900/30`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
          {title}
        </h3>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
    <p className="text-sm text-neutral-600 dark:text-neutral-400">
      {title === '질의응답 모드' 
        ? '보험 상품의 보장 내용, 면책사항, 청구 방법 등에 대해 질문하세요.' 
        : '고객 정보를 바탕으로 최적의 보험 상품을 추천해드립니다.'}
    </p>
  </button>
);

const ExampleQuestions: React.FC<{ questionType: QuestionType }> = ({ questionType }) => {
  const examples = questionType === '질의응답' ? 
    [
      { q: "유방암은 보장 대상입니까?", desc: "암보험 보장 범위 문의" },
      { q: "실손보험 중복가입 가능한가요?", desc: "중복가입 조건 문의" },
    ] : [
      { q: "30대 여성 직장인에게 암보험 추천", desc: "맞춤형 설계 요청" },
      { q: "월 10만원 이하 실비보험 추천", desc: "예산 기반 설계" },
    ];

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
        예시 질문
      </h3>
      <div className="space-y-3">
        {examples.map((ex, i) => (
          <div key={i} className="p-4 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 text-left flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-secondary-50 text-secondary-600 dark:bg-secondary-900/50 dark:text-secondary-400 font-mono text-sm">
              Q
            </div>
            <div className="flex-1">
              <p className="font-medium text-neutral-900 dark:text-neutral-50">{ex.q}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{ex.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ questionType, setQuestionType }) => {
  return (
    <div className="w-full max-w-3xl mx-auto text-center py-12 px-4">
      <div className="flex justify-center mb-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary-500/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-500/20">
            <Bot className="h-12 w-12 text-secondary-500" />
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-3">
        안녕하세요, 설계사님! 무엇을 도와드릴까요?
      </h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto">
        동양생명 AI 어시스턴트입니다. 보험 약관 문의부터 맞춤형 설계 추천까지, 
        업무에 필요한 모든 정보를 빠르고 정확하게 제공해드립니다.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <ModeCard
          icon={<MessageSquare className="h-7 w-7 text-secondary-600" />}
          title="질의응답 모드"
          description="보험 약관 및 상품 문의"
          active={questionType === '질의응답'}
          onClick={() => setQuestionType('질의응답')}
          color="secondary"
        />
        <ModeCard
          icon={<Sparkles className="h-7 w-7 text-primary-500" />}
          title="설계추천 모드"
          description="맞춤형 보험 설계 추천"
          active={questionType === '설계추천'}
          onClick={() => setQuestionType('설계추천')}
          color="primary"
        />
      </div>

      <ExampleQuestions questionType={questionType} />
    </div>
  );
};

export default WelcomeScreen;