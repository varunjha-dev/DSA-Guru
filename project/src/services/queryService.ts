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
      // First time user
      await setDoc(userDocRef, {
        dailyCount: 0,
        lastQueryDate: today
      });
      return { canQuery: true, remainingQueries: 5 };
    }
    
    const data = userDoc.data() as UserQueryData;
    
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
    return { canQuery: false, remainingQueries: 0 };
  }
};

export const incrementQueryCount = async (userId: string): Promise<void> => {
  const today = new Date().toISOString().split('T')[0];
  const userDocRef = doc(db, 'userQueries', userId);
  
  try {
    await updateDoc(userDocRef, {
      dailyCount: increment(1),
      lastQueryDate: today
    });
  } catch (error) {
    console.error('Error incrementing query count:', error);
  }
};