import React from 'react';
import { LogOut, Settings, Phone, Mail, Sun, Moon } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

const Header: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useChatStore();

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 shadow-sm z-10">
      <div className="flex items-center">
        {/* 동양생명 가상 로고 */}
        <img src="/vite.svg" alt="Dongyang Life Logo" className="h-8 w-8 mr-2" /> {/* 임시 로고 */}
        <h1 className="text-xl font-semibold text-secondary dark:text-secondary-foreground">동양생명 챗봇</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
          <Phone className="h-4 w-4 mr-1" />
          <span>1588-0000</span>
          <Mail className="h-4 w-4 ml-3 mr-1" />
          <span>support@donyang.com</span>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700"
          aria-label="다크 모드 토글"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
          )}
        </button>
        <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <Settings className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        </button>
        <button className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700">
          <LogOut className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;