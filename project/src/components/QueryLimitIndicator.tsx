import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface QueryLimitIndicatorProps {
  remainingQueries: number;
  canQuery: boolean;
}

export const QueryLimitIndicator: React.FC<QueryLimitIndicatorProps> = ({ 
  remainingQueries, 
  canQuery 
}) => {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
      canQuery 
        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
    }`}>
      {canQuery ? (
        <CheckCircle className="w-4 h-4" />
      ) : (
        <AlertCircle className="w-4 h-4" />
      )}
      
      <span>
        {canQuery 
          ? `${remainingQueries} queries remaining today`
          : 'Daily limit reached! Try again tomorrow.'
        }
      </span>
    </div>
  );
};