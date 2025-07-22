@@ .. @@
 import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';
 import { db } from '../firebase/config';

 export interface UserQueryData {
   dailyCount: number;
   lastQueryDate: string;
 }

 export const checkQueryLimit = async (userId: string): Promise<{ canQuery: boolean; remainingQueries: number }> => {
   const today = new Date().toISOString().split('T')[0];
   const userDocRef = doc(db, 'userQueries', userId);
   
   try {
     const userDoc = await getDoc(userDocRef);
     
     if (!userDoc.exists()) {
      // First time user - create document
       await setDoc(userDocRef, {
         dailyCount: 0,
         lastQueryDate: today
       });
       return { canQuery: true, remainingQueries: 5 };
     }
     
     const data = userDoc.data() as UserQueryData;
    
    // Ensure data has required fields
    if (!data.hasOwnProperty('dailyCount') || !data.hasOwnProperty('lastQueryDate')) {
      await setDoc(userDocRef, {
        dailyCount: 0,
        lastQueryDate: today
      });
      return { canQuery: true, remainingQueries: 5 };
    }
     
     // Reset count if it's a new day
     if (data.lastQueryDate !== today) {
       await updateDoc(userDocRef, {
         dailyCount: 0,
         lastQueryDate: today
       });
       return { canQuery: true, remainingQueries: 5 };
     }
     
     // Check if user has reached the limit
     const remainingQueries = Math.max(0, 5 - data.dailyCount);
     const canQuery = data.dailyCount < 5;
     
     return { canQuery, remainingQueries };
   } catch (error) {
     console.error('Error checking query limit:', error);
    // Fail-safe: allow queries if there's an error
+    // If there's an error, allow the user to query (fail-safe approach)
+    return { canQuery: true, remainingQueries: 5 };
   }
 };

 export const incrementQueryCount = async (userId: string): Promise<void> => {
   const today = new Date().toISOString().split('T')[0];
   const userDocRef = doc(db, 'userQueries', userId);
   
   try {
-    await updateDoc(userDocRef, {
-      dailyCount: increment(1),
-      lastQueryDate: today
-    });
+    const userDoc = await getDoc(userDocRef);
+    
+    if (!userDoc.exists()) {
+      // Create document if it doesn't exist
+      await setDoc(userDocRef, {
+        dailyCount: 1,
+        lastQueryDate: today
+      });
+    } else {
+      const data = userDoc.data() as UserQueryData;
+      
+      // Reset count if it's a new day, then increment
+      if (data.lastQueryDate !== today) {
+        await updateDoc(userDocRef, {
+          dailyCount: 1,
+          lastQueryDate: today
+        });
+      } else {
+        await updateDoc(userDocRef, {
+          dailyCount: increment(1),
+          lastQueryDate: today
+        });
+      }
+    }
   } catch (error) {
     console.error('Error incrementing query count:', error);
   }
 };