import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore";

const createWarehouse = async (name, location) => {
  await addDoc(collection(db, "warehouses"), {
    name,
    location,
    createdAt: new Date()
  });
};

const createSeedWarehouses = async () => {
  const seedWarehouses = [
    { name: 'Warehouse A', location: '123 Industrial Way, City, Country' },
    { name: 'Warehouse B', location: '456 Commerce St, City, Country' },
    { name: 'Warehouse C', location: '789 Logistics Ave, City, Country' },
    { name: 'Warehouse D', location: '101 Distribution Blvd, City, Country' },
    { name: 'Warehouse E', location: '202 Storage Dr, City, Country' },
  ];

  for (const warehouse of seedWarehouses) {
    await createWarehouse(warehouse.name, warehouse.location);
  }
};

const getWarehouse = async (warehouseId) => {
  const warehouseDoc = await getDoc(doc(db, "warehouses", warehouseId));
  if (warehouseDoc.exists()) {
    return warehouseDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getWarehouses = async () => {
  const querySnapshot = await getDocs(collection(db, "warehouses"));
  const warehouses = querySnapshot.docs.map(doc => ({ ...doc.data(), warehouseId: doc.id }));
  return warehouses;
};

const updateWarehouse = async (warehouseId, updates) => {
  const warehouseRef = doc(db, "warehouses", warehouseId);
  await updateDoc(warehouseRef, { ...updates, updatedAt: new Date() });
};

const deleteWarehouse = async (warehouseId) => {
  await deleteDoc(doc(db, "warehouses", warehouseId));
};

export { createWarehouse, createSeedWarehouses, getWarehouse, getWarehouses, updateWarehouse, deleteWarehouse };