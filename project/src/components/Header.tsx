import React from 'react';
import { Moon, Sun, LogOut, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              DSA Guru
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Welcome, {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Student'}!
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};