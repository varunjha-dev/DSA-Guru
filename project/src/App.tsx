import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useAuth } from './context/AuthContext';
import { AuthForm } from './components/AuthForm';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <AuthForm />;
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Dashboard />
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;