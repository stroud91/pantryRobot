import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, onSnapshot, doc, query, getDocs } from "firebase/firestore";

const createSupplier = async (name, contactInfo, address) => {
  await addDoc(collection(db, "suppliers"), {
    name,
    contactInfo,
    address,
    createdAt: new Date()
  });
};

const createSeedSuppliers = async () => {
  const seedSuppliers = [
    { name: 'Supplier A', contactInfo: '123-456-7890', address: '123 Main St, City, Country' },
    { name: 'Supplier B', contactInfo: '987-654-3210', address: '456 Oak St, City, Country' },
    { name: 'Supplier C', contactInfo: '456-789-1234', address: '789 Pine St, City, Country' },
    { name: 'Supplier D', contactInfo: '321-654-9870', address: '321 Maple St, City, Country' },
    { name: 'Supplier E', contactInfo: '654-321-0987', address: '654 Elm St, City, Country' },
  ];

  const existingSuppliersQuery = query(collection(db, "suppliers"));
  const querySnapshot = await getDocs(existingSuppliersQuery);
  const existingSuppliers = querySnapshot.docs.map(doc => doc.data().name);

  for (const supplier of seedSuppliers) {
    if (!existingSuppliers.includes(supplier.name)) {
      await createSupplier(supplier.name, supplier.contactInfo, supplier.address);
    }
  }
};

const getSuppliers = (setSuppliers) => {
  const unsubscribe = onSnapshot(collection(db, "suppliers"), (querySnapshot) => {
    const suppliers = [];
    querySnapshot.forEach((doc) => {
      suppliers.push({ ...doc.data(), supplierId: doc.id });
    });
    setSuppliers(suppliers);
  });
  return unsubscribe;
};

const updateSupplier = async (supplierId, updates) => {
  const supplierRef = doc(db, "suppliers", supplierId);
  await updateDoc(supplierRef, { ...updates, updatedAt: new Date() });
};

const deleteSupplier = async (supplierId) => {
  await deleteDoc(doc(db, "suppliers", supplierId));
};

export { createSupplier, createSeedSuppliers, getSuppliers, updateSupplier, deleteSupplier };
