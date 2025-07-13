import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 0.8) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  } else if (confidence >= 0.6) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
  } else {
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  }
}

export function getConfidenceLabel(confidence: number): string {
  if (confidence >= 0.8) {
    return '높음';
  } else if (confidence >= 0.6) {
    return '보통';
  } else {
    return '낮음';
  }
}