import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

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

export const createUser = async (userId, username, score) => {
  try {
    const userRef = ref(database, `/users/${userId}`);
    await set(userRef, { 
      'username': username,
      'score': score
    });

  } catch (err) {
    console.error('Error creating user:', err);
  }
};

export const getUsersByScore = async (limit = 5) => {
  try {
  const userRef = ref(database, `/users/`);
  const snapshot = await get(userRef);
  const data = snapshot.val() || {};
  const sortedUsers = Object.values(data).sort((user1, user2) => user2.score - user1.score);
  const users = sortedUsers.slice(0, limit);

  const lastKey = snapshot.val() ? Object.keys(users).pop() : null;
  return { users, lastKey }; 
  } catch (err) {
    console.error('Error creating user:', err);
    
  }
};

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  