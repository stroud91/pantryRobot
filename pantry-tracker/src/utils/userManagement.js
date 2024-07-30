import { db } from './firebaseConfig';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    await setDoc(doc(db, 'users', userId), {
      userId,
      email,
      createdAt: new Date()
    });
    console.log(`User created: ${email}`);
  } catch (error) {
    console.error(`Error creating user ${email}:`, error.message);
  }
};

const createSeedUsers = async () => {
  const seedUsers = [
    { email: 'user1@example.com', password: 'password123' },
    { email: 'user2@example.com', password: 'password123' },
    { email: 'user3@example.com', password: 'password123' },
    { email: 'user4@example.com', password: 'password123' },
    { email: 'user5@example.com', password: 'password123' },
  ];

  for (const user of seedUsers) {
    await createUser(user.email, user.password);
  }
};

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  const users = querySnapshot.docs.map(doc => doc.data());
  return users;
};

export { createUser, createSeedUsers, getUsers };