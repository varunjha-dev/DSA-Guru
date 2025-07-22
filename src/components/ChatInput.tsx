@@ .. @@
           <textarea
             value={message}
             onChange={(e) => setMessage(e.target.value)}
-            placeholder={disabled ? "Daily limit reached. Try again tomorrow!" : "Ask me anything about Data Structures & Algorithms..."}
+            placeholder={disabled ? "Daily limit reached! Try again tomorrow 🙏" : "Ask me anything about Data Structures & Algorithms... 🚀"}
             disabled={disabled || loading}
             rows={1}
             className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"