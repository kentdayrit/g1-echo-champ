import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4Tzt1hAM8pZZO8PVDzN39nN_eOXP_-fk",
  authDomain: "g1-echo-cham-app.firebaseapp.com",
  projectId: "g1-echo-cham-app",
  storageBucket: "g1-echo-cham-app.appspot.com",
  messagingSenderId: "1032440609952",
  appId: "1:1032440609952:web:7033e8538efba71257ddc5",
  measurementId: "G-2M6CVQZLJ4"
};

export { database }
export const createScore = async (userId, username, score) => {
    try {
      const userRef = ref(database, `/users/${userId}`);
      await set(userRef, { username, bestScore: score });
      console.log('Score created successfully');
    } catch (err) {
      console.error('Error creating score:', err);
    }
  };
  
  export const getScore = async (userId) => {
    try {
      const userRef = ref(database, `/users/${userId}`);
      const snapshot = await get(userRef);
      const data = snapshot.val();
      if (data) {
        return data.bestScore;
      } else {
        return null;
      }
    } catch (err) {
      console.error('Error getting score:', err);
      return null; // Or handle error differently (e.g., throw error)
    }
  };

  export const getAllScore = async () => {
    try {
      const userRef = ref(database, `/users`);
      const snapshot = await get(userRef);
      const data = snapshot.val();
      if (data) {
        return data;
      } else {
        return null;
      }
    } catch (err) {
      console.error('Error getting score:', err);
      return null; // Or handle error differently (e.g., throw error)
    }
  };


  export const updateScore = async (userId, newScore) => {
    try {
      const userRef = ref(database, `/users/${userId}`);
      const currentScore = await getScore(userId); // Check current score first
  
      if (newScore > currentScore) {
        await update(userRef, { bestScore: newScore });
        console.log('Score updated successfully');
      } else {
        console.log('New score is not higher than current best score');
      }
    } catch (err) {
      console.error('Error updating score:', err);
    }
  };

  export const deleteScore = async (userId) => {
    try {
      const userRef = ref(database, `/users/${userId}`);
      await set(userRef, null); // Set to null to delete the user node
      console.log('Score deleted successfully');
    } catch (err) {
      console.error('Error deleting score:', err);
    }
  };
  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  