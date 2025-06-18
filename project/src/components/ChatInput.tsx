import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  loading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, loading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !loading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={disabled ? "Daily limit reached. Try again tomorrow!" : "Ask me anything about Data Structures & Algorithms..."}
            disabled={disabled || loading}
            rows={1}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '48px', maxHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || disabled || loading}
          className="px-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[48px]"
        >
          {loading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </form>
  );
};