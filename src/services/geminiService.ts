@@ .. @@
     // Validate if the query is DSA-related (basic check for now)
-    const dsaKeywords = ['stack', 'queue', 'array', 'linked list', 'tree', 'graph', 'sort', 'search', 'algorithm', 'data structure'];
-    const isDSAQuery = dsaKeywords.some(keyword => query.toLowerCase().includes(keyword));
-    if (!isDSAQuery) {
-      return 'Sorry! I will only answer DSA Related Queries and Questionss';
-    }
+    const dsaKeywords = [
+      'stack', 'queue', 'array', 'linked list', 'tree', 'graph', 'sort', 'search', 
+      'algorithm', 'data structure', 'binary', 'heap', 'hash', 'recursion', 'dynamic',
+      'programming', 'greedy', 'backtrack', 'dfs', 'bfs', 'traversal', 'insertion',
+      'selection', 'bubble', 'merge', 'quick', 'radix', 'counting', 'bucket',
+      'linear', 'binary search', 'complexity', 'time', 'space', 'big o', 'o(n)',
+      'leetcode', 'coding', 'interview', 'problem', 'solve', 'optimize', 'efficient',
+      'node', 'pointer', 'index', 'iterate', 'loop', 'condition', 'base case',
+      'inorder', 'preorder', 'postorder', 'level order', 'depth', 'breadth',
+      'adjacency', 'matrix', 'list', 'directed', 'undirected', 'weighted', 'cycle',
+      'shortest path', 'minimum', 'maximum', 'peak', 'valley', 'sliding window',
+      'two pointer', 'fast slow', 'kadane', 'fibonacci', 'factorial', 'gcd', 'lcm'
+    ];
+    
+    const queryLower = query.toLowerCase();
+    const isDSAQuery = dsaKeywords.some(keyword => queryLower.includes(keyword)) ||
+                      queryLower.includes('dsa') ||
+                      queryLower.includes('data structures') ||
+                      queryLower.includes('algorithms') ||
+                      /\b(what|how|explain|solve|implement|code|write|find|calculate|optimize)\b/.test(queryLower);
+    
+    if (!isDSAQuery) {
+      return 'Arre bhai, yeh kya baklol sawaal hai? DSA ke baare mein poochh, warna dhamki milegi! 😤\n\nMain sirf Data Structures aur Algorithms ke sawal ka jawab deta hun. Stack, Queue, Trees, Sorting, Searching - yeh sab pooch sakta hai!';
+    }