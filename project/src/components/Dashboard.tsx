import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { QueryLimitIndicator } from './QueryLimitIndicator';
import { useAuth } from '../context/AuthContext';
import { generateDSAResponse } from '../services/geminiService';
import { checkQueryLimit, incrementQueryCount } from '../services/queryService';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Dashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [remainingQueries, setRemainingQueries] = useState(5);
  const [canQuery, setCanQuery] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentUser } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadQueryLimit = async () => {
      if (currentUser) {
        const { canQuery: canQueryValue, remainingQueries: remaining } = await checkQueryLimit(currentUser.uid);
        setCanQuery(canQueryValue);
        setRemainingQueries(remaining);
      }
    };

    loadQueryLimit();
  }, [currentUser]);

  useEffect(() => {
    // Add welcome message on first load
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `Namaste! Main tumhara DSA Guru hun! 🙏\n\nMujhse koi bhi Data Structures aur Algorithms ka sawal pucho - Stack, Queue, Linked List, Trees, Sorting, kuch bhi! Main tumhe College Senior ki tarah samjhaunga with Java code examples.\n\nBas yaad rakhna - sirf DSA ke sawal karna, warna main naraz ho jaunga! 😄`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async (messageText: string) => {
    if (!currentUser || !canQuery || loading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Generate AI response
      const aiResponse = await generateDSAResponse(messageText);
      
      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Increment query count
      await incrementQueryCount(currentUser.uid);
      
      // Update remaining queries
      const newRemaining = Math.max(0, remainingQueries - 1);
      setRemainingQueries(newRemaining);
      setCanQuery(newRemaining > 0);

    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Arre bhai, kuch toh gadbad ho gaya! Thoda baad mein try karo. 😅',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Query limit indicator */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <QueryLimitIndicator remainingQueries={remainingQueries} canQuery={canQuery} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              shouldAnimate={!message.isUser && index === messages.length - 1 && !loading}
            />
          ))}
          {loading && (
            <div className="flex items-center gap-3 p-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
              <div className="text-gray-500 dark:text-gray-400">Guru is thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput 
        onSendMessage={handleSendMessage} 
        disabled={!canQuery} 
        loading={loading}
      />
    </div>
  );
};