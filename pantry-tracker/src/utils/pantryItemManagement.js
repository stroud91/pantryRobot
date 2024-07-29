import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, query, where, getDocs, doc } from "firebase/firestore";

const createPantryItem = async (item) => {
  await addDoc(collection(db, "pantryItems"), {
    ...item,
    addedAt: new Date(),
    updatedAt: new Date()
  });
};

const createSeedPantryItems = async (userId) => {
  const seedItems = [
    { name: 'Milk', quantity: 2, unit: 'liters', expirationDate: new Date(), category: 'Dairy', userId },
    { name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: new Date(), category: 'Dairy', userId },
    { name: 'Bread', quantity: 1, unit: 'loaf', expirationDate: new Date(), category: 'Bakery', userId },
    { name: 'Apples', quantity: 6, unit: 'pieces', expirationDate: new Date(), category: 'Fruit', userId },
    { name: 'Chicken Breast', quantity: 4, unit: 'pieces', expirationDate: new Date(), category: 'Meat', userId },
  ];

  for (const item of seedItems) {
    await createPantryItem(item);
  }
};

const getPantryItem = async (itemId) => {
  const itemDoc = await getDoc(doc(db, "pantryItems", itemId));
  if (itemDoc.exists()) {
    return itemDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getPantryItems = async (userId) => {
  const q = query(collection(db, "pantryItems"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const pantryItems = querySnapshot.docs.map(doc => ({ ...doc.data(), itemId: doc.id }));
  return pantryItems;
};

const updatePantryItem = async (itemId, updates) => {
  const itemRef = doc(db, "pantryItems", itemId);
  await updateDoc(itemRef, { ...updates, updatedAt: new Date() });
};

const deletePantryItem = async (itemId) => {
  await deleteDoc(doc(db, "pantryItems", itemId));
};

export { createPantryItem, createSeedPantryItems, getPantryItem, getPantryItems, updatePantryItem, deletePantryItem };