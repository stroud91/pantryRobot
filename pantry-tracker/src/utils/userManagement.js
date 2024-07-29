import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, query, where, getDocs, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebaseConfig';

const createUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user.uid;
  await addDoc(doc(db, "users", userId), {
    userId,
    email,
    createdAt: new Date()
  });
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

const getUser = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map(doc => doc.data());
  return users;
};

const updateUser = async (userId, updates) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, updates);
};

const deleteUser = async (userId) => {
  await deleteDoc(doc(db, "users", userId));
};

export { createUser, createSeedUsers, getUser, getUsers, updateUser, deleteUser };