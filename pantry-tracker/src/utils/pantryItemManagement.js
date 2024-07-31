import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, onSnapshot, query, where, getDocs, doc } from "firebase/firestore";

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

  const existingItemsQuery = query(collection(db, "pantryItems"), where("userId", "==", userId));
  const querySnapshot = await getDocs(existingItemsQuery);
  const existingItems = querySnapshot.docs.map(doc => doc.data().name);

  for (const item of seedItems) {
    if (!existingItems.includes(item.name)) {
      await createPantryItem(item);
    }
  }
};

const getPantryItems = (userId, setPantryItems) => {
  const q = query(collection(db, "pantryItems"), where("userId", "==", userId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const pantryItems = [];
    querySnapshot.forEach((doc) => {
      pantryItems.push({ ...doc.data(), itemId: doc.id });
    });
    setPantryItems(pantryItems);
  });
  return unsubscribe;
};

const updatePantryItem = async (itemId, updates) => {
  const itemRef = doc(db, "pantryItems", itemId);
  await updateDoc(itemRef, { ...updates, updatedAt: new Date() });
};

const deletePantryItem = async (itemId) => {
  await deleteDoc(doc(db, "pantryItems", itemId));
};

export { createPantryItem, createSeedPantryItems, getPantryItems, updatePantryItem, deletePantryItem };
