# 보험설계사 전용 AI 챗봇 프론트엔드

보험설계사가 고객에게 적합한 상품을 추천하고, 약관 관련 질문에 자동으로 응답받을 수 있는 AI 챗봇 서비스의 프론트엔드입니다.

## 🚀 기능

- **자연어 질의응답**: 보험 상품 및 약관에 대한 질문
- **설계 추천**: 고객 정보 기반 보험 설계안 추천
- **실시간 채팅**: 타이핑 애니메이션과 함께 실시간 대화
- **컨텍스트 표시**: AI 응답의 신뢰도와 참고 문서 출처 표시
- **다크 모드**: 시스템 설정에 따른 자동 다크 모드 지원
- **반응형 디자인**: 모바일 및 데스크톱 환경 지원

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Tailwind CSS + Headless UI
- **상태관리**: Zustand
- **HTTP 클라이언트**: Axios
- **마크다운 렌더링**: React Markdown

## 📋 요구사항

- Node.js 18 이상
- npm 또는 yarn
- Spring Boot 백엔드 서버 (포트 8080)

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# API 백엔드 URL
VITE_API_BASE_URL=http://localhost:8080
VITE_API_ENDPOINT=/api/chat

# 개발 환경 설정
VITE_DEV_MODE=true
```

### 3. 개발 서버 실행

```bash
npm run dev
```

애플리케이션이 http://localhost:5173 에서 실행됩니다.

### 4. 프로덕션 빌드

```bash
npm run build
```

## 🔌 백엔드 API 연동

### API 엔드포인트

- **POST /api/chat**: 챗봇 메시지 전송
- **GET /api/health**: 서버 상태 확인
- **POST /api/auth/login**: 사용자 인증 (옵션)

### 요청 형식

```json
{
  "message": "40대 남성 고객에게 암보험 추천해줘",
  "questionType": "설계추천",
  "customerProfile": {
    "age": 40,
    "gender": "남성",
    "occupation": "사무직"
  }
}
```

### 응답 형식

```json
{
  "id": "response_123",
  "content": "40대 남성 고객에게는 다음과 같은 암보험을 추천드립니다...",
  "confidence": 0.85,
  "sources": ["보험약관_v1.2.pdf", "상품설명서_암보험.pdf"],
  "timestamp": "2024-01-15T10:30:00Z",
  "contextUsed": ["chunk_001", "chunk_045"]
}
```

## 🎯 사용법

### 1. 질의응답 모드

- 상단 토글을 "질의응답"으로 설정
- 보험 상품이나 약관에 대한 질문 입력
- 예시: "이 특약의 예외 조항이 뭐야?"

### 2. 설계추천 모드

- 상단 토글을 "설계추천"으로 설정
- 고객 정보와 함께 보험 설계 요청
- 예시: "40대 남성 고객에게 암보험 추천해줘"

### 3. 기능 설명

- **연결 상태**: 헤더에서 백엔드 서버 연결 상태 확인
- **타이핑 애니메이션**: AI 응답이 실시간으로 타이핑되는 효과
- **신뢰도 표시**: AI 응답의 신뢰도 퍼센트 표시
- **참고 문서**: 응답에 사용된 문서 출처 링크 표시

## 🔧 개발 설정

### CORS 설정

프론트엔드에서 백엔드 API 호출 시 CORS 문제를 해결하기 위해 Vite 프록시를 설정했습니다:

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

### 백엔드 CORS 설정

Spring Boot 백엔드에서도 CORS를 허용해야 합니다:

```java
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class ChatController {
    // 컨트롤러 구현
}
```

## 📁 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── ChatContainer.tsx    # 메인 채팅 컨테이너
│   ├── ChatInput.tsx        # 메시지 입력 컴포넌트
│   └── MessageBubble.tsx    # 메시지 버블 컴포넌트
├── services/           # API 서비스
│   └── api.ts              # HTTP 클라이언트 설정
├── store/              # 상태 관리
│   └── chatStore.ts        # Zustand 스토어
├── types/              # TypeScript 타입 정의
│   └── chat.ts             # 채팅 관련 타입
├── App.tsx             # 메인 앱 컴포넌트
└── main.tsx            # 앱 진입점
```

## 🐛 문제 해결

### 백엔드 연결 실패

1. 백엔드 서버가 포트 8080에서 실행 중인지 확인
2. `.env` 파일의 API URL이 올바른지 확인
3. 브라우저 개발자 도구에서 네트워크 탭 확인

### 타이핑 애니메이션 문제

- 긴 응답의 경우 타이핑 속도를 조절하려면 `MessageBubble.tsx`의 `typingInterval` 값을 변경하세요

### 스타일링 문제

- Tailwind CSS가 올바르게 로드되지 않는 경우 `npm run dev`를 다시 실행하세요

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

프로젝트 개선을 위한 기여를 환영합니다. 이슈나 풀 리퀘스트를 통해 참여해주세요.
