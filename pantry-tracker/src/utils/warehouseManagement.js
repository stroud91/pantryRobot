import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, onSnapshot, doc, query, getDocs } from "firebase/firestore";

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

  const existingWarehousesQuery = query(collection(db, "warehouses"));
  const querySnapshot = await getDocs(existingWarehousesQuery);
  const existingWarehouses = querySnapshot.docs.map(doc => doc.data().name);

  for (const warehouse of seedWarehouses) {
    if (!existingWarehouses.includes(warehouse.name)) {
      await createWarehouse(warehouse.name, warehouse.location);
    }
  }
};

const getWarehouses = (setWarehouses) => {
  const unsubscribe = onSnapshot(collection(db, "warehouses"), (querySnapshot) => {
    const warehouses = [];
    querySnapshot.forEach((doc) => {
      warehouses.push({ ...doc.data(), warehouseId: doc.id });
    });
    setWarehouses(warehouses);
  });
  return unsubscribe;
};

const updateWarehouse = async (warehouseId, updates) => {
  const warehouseRef = doc(db, "warehouses", warehouseId);
  await updateDoc(warehouseRef, { ...updates, updatedAt: new Date() });
};

const deleteWarehouse = async (warehouseId) => {
  await deleteDoc(doc(db, "warehouses", warehouseId));
};

export { createWarehouse, createSeedWarehouses, getWarehouses, updateWarehouse, deleteWarehouse };
