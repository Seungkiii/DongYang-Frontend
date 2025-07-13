import React from 'react';
import { LayoutDashboard, History, FileText, Settings, User } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-neutral-100 dark:bg-neutral-800 p-4 shadow-md flex flex-col">
      <div className="mb-8">
        <div className="flex items-center p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer">
          <User className="h-5 w-5 mr-2 text-secondary-600 dark:text-secondary-400" />
          <span className="font-medium text-neutral-800 dark:text-neutral-200">내 정보</span>
        </div>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              대시보드
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              <History className="h-5 w-5 mr-3" />
              이력조회
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              <FileText className="h-5 w-5 mr-3" />
              약관검색
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="flex items-center p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
              <Settings className="h-5 w-5 mr-3" />
              설정
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;