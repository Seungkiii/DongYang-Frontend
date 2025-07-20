import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FallbackMessageProps {
  message: string;
}

const FallbackMessage: React.FC<FallbackMessageProps> = ({ message }) => (
  <div className="my-3 flex items-center space-x-2 text-xs text-red-600 dark:text-red-300">
    <AlertCircle className="h-4 w-4" />
    <span>{message}</span>
  </div>
);

export default FallbackMessage;
