@@ .. @@
   useEffect(() => {
     const loadQueryLimit = async () => {
       if (currentUser) {
          const { canQuery: canQueryValue, remainingQueries: remaining } = result;
-        setRemainingQueries(remaining);
+        try {
+          const { canQuery: canQueryValue, remainingQueries: remaining } = await checkQueryLimit(currentUser.uid);
+          setCanQuery(canQueryValue);
+          setRemainingQueries(remaining);
          // Default to allowing queries if there's an error (fail-safe)
+          console.error('Error loading query limit:', error);
+          // Default to allowing queries if there's an error
+          setCanQuery(true);
+          setRemainingQueries(5);
+        }
       }
     };

     loadQueryLimit();
   }, [currentUser]);