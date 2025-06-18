import React, { useState, useEffect, useRef } from 'react';
import { User, Bot, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
  };
  shouldAnimate?: boolean;
  isDarkMode?: boolean;
}

interface CodeBlockProps {
  children: string;
  className?: string;
  isDarkMode?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className, isDarkMode = false }) => {
  const [copied, setCopied] = useState(false);
  const language = className?.replace('language-', '') || 'text';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-2 sm:my-4">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-2 sm:px-4 py-1 sm:py-2 rounded-t-lg">
        <span className="text-xs sm:text-sm text-gray-300 font-medium capitalize">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? oneDark : oneLight}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem',
          padding: '0.5rem 0.75rem', // Ensure consistent padding
        }}
        showLineNumbers={language !== 'text'}
        CodeTag={(props: any) => (
          <code {...props} className="text-xs sm:text-sm font-mono" />
        )}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  shouldAnimate = false, 
  isDarkMode = false 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [renderMarkdown, setRenderMarkdown] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldAnimate && !message.isUser) {
      setIsAnimating(true);
      setDisplayedText('');
      setRenderMarkdown(false);

      let index = 0;
      const chunkSize = 5;
      const totalLength = message.text.length;

      const animate = () => {
        if (index < totalLength) {
          const nextIndex = Math.min(index + chunkSize, totalLength);
          setDisplayedText(message.text.slice(0, nextIndex));
          index = nextIndex;
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          setRenderMarkdown(true);
        }
      };

      rafRef.current = requestAnimationFrame(animate);

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    } else {
      setDisplayedText(message.text);
      setRenderMarkdown(true);
    }
  }, [message.text, shouldAnimate, message.isUser]);

  const markdownComponents = {
    code: ({ node, inline, className, children, ...props }: any) => {
      if (inline) {
        return (
          <code 
            className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <CodeBlock className={className} isDarkMode={isDarkMode}>
          {String(children).replace(/\n$/, '')}
        </CodeBlock>
      );
    },
    h1: ({ children }: any) => (
      <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-1 sm:pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 mt-4 sm:mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-900 dark:text-gray-100 mt-3 sm:mt-4">
        {children}
      </h3>
    ),
    p: ({ children }: any) => (
      <p className="mb-2 sm:mb-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed">
        {children}
      </p>
    ),
    ul: ({ children }: any) => (
      <ul className="list-disc list-inside mb-2 sm:mb-4 space-y-0.5 sm:space-y-1 text-gray-800 dark:text-gray-200 ml-2 sm:ml-4 text-sm sm:text-base">
        {children}
      </ul>
    ),
    ol: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-2 sm:mb-4 space-y-0.5 sm:space-y-1 text-gray-800 dark:text-gray-200 ml-2 sm:ml-4 text-sm sm:text-base">
        {children}
      </ol>
    ),
    li: ({ children }: any) => (
      <li className="mb-0.5 sm:mb-1 leading-relaxed text-sm sm:text-base">{children}</li>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-2 sm:pl-4 py-1 sm:py-2 mb-2 sm:mb-4 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 italic text-sm sm:text-base">
        {children}
      </blockquote>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-2 sm:mb-4">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg text-sm sm:text-base">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: any) => (
      <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
    ),
    tbody: ({ children }: any) => (
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    ),
    tr: ({ children }: any) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">{children}</tr>
    ),
    th: ({ children }: any) => (
      <th className="px-2 sm:px-4 py-1 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </th>
    ),
    td: ({ children }: any) => (
      <td className="px-2 sm:px-4 py-1 sm:py-3 text-xs sm:text-sm text-gray-800 dark:text-gray-200">
        {children}
      </td>
    ),
  };

  return (
    <div className={`flex items-start gap-2 sm:gap-4 p-3 sm:p-6 ${message.isUser ? 'flex-row-reverse' : ''} group hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors`}>
      <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg ${
        message.isUser 
          ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
      }`}>
        {message.isUser ? (
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        ) : (
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        )}
      </div>
      
      <div className={`flex-1 max-w-full sm:max-w-4xl ${message.isUser ? 'text-right' : ''}`}>
        <div className={`${message.isUser ? 'flex justify-end' : ''}`}>
          <div className={`${
            message.isUser
              ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl rounded-br-md px-3 sm:px-4 py-2 sm:py-3 shadow-lg max-w-[85%] sm:max-w-2xl'
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl rounded-bl-md border border-gray-200 dark:border-gray-700 shadow-sm w-full max-w-[85%] sm:w-full'
          }`}>
            {message.isUser ? (
              <div className="whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base">
                {displayedText}
                {isAnimating && <span className="animate-pulse ml-1">|</span>}
              </div>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert prose-pre:p-0 prose-pre:m-0">
                {renderMarkdown ? (
                  <ReactMarkdown
                    components={markdownComponents}
                    remarkPlugins={[remarkGfm]}
                  >
                    {displayedText}
                  </ReactMarkdown>
                ) : (
                  <div className="whitespace-pre-wrap break-words leading-relaxed text-sm sm:text-base text-gray-900 dark:text-gray-100">
                    {displayedText}
                    {isAnimating && (
                      <span className="inline-block w-1 h-4 sm:w-2 sm:h-5 bg-blue-500 animate-pulse ml-1 rounded-sm"></span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className={`text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2 px-1 ${
          message.isUser ? 'text-right' : 'text-left'
        }`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </div>
      </div>
    </div>
  );
};