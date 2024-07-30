import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore";

const createOrder = async (itemId, supplierId, quantity, deliveryDate) => {
  await addDoc(collection(db, "orders"), {
    itemId,
    supplierId,
    quantity,
    orderDate: new Date(),
    deliveryDate: new Date(deliveryDate),
    status: "pending",
    createdAt: new Date()
  });
};

const createSeedOrders = async () => {
  const seedOrders = [
    { itemId: 'item1', supplierId: 'supplier1', quantity: 10, deliveryDate: '2024-08-01' },
    { itemId: 'item2', supplierId: 'supplier2', quantity: 20, deliveryDate: '2024-08-05' },
    { itemId: 'item3', supplierId: 'supplier3', quantity: 15, deliveryDate: '2024-08-10' },
    { itemId: 'item4', supplierId: 'supplier4', quantity: 25, deliveryDate: '2024-08-15' },
    { itemId: 'item5', supplierId: 'supplier5', quantity: 30, deliveryDate: '2024-08-20' },
  ];

  for (const order of seedOrders) {
    await createOrder(order.itemId, order.supplierId, order.quantity, order.deliveryDate);
  }
};

const getOrder = async (orderId) => {
  const orderDoc = await getDoc(doc(db, "orders", orderId));
  if (orderDoc.exists()) {
    return orderDoc.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

const getOrders = async () => {
  const querySnapshot = await getDocs(collection(db, "orders"));
  const orders = querySnapshot.docs.map(doc => ({ ...doc.data(), orderId: doc.id }));
  return orders;
};

const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, { status, updatedAt: new Date() });
};

const deleteOrder = async (orderId) => {
  await deleteDoc(doc(db, "orders", orderId));
};

export { createOrder, createSeedOrders, getOrder, getOrders, updateOrderStatus, deleteOrder };