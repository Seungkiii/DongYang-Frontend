import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatContainer from './components/ChatContainer';

function App() {
  // 다크 모드 상태 관리 (zustand 또는 React Context 사용 예정)
  const isDarkMode = false; // 임시 값

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''} bg-neutral-50 text-neutral-900`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-hidden">
          <ChatContainer />
        </main>
      </div>
    </div>
  );
}

export default App;