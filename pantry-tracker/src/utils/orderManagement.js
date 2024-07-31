import { db } from './firebaseConfig';
import { collection, addDoc, getDoc, updateDoc, deleteDoc, onSnapshot, doc, query, getDocs } from "firebase/firestore";

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

  const existingOrdersQuery = query(collection(db, "orders"));
  const querySnapshot = await getDocs(existingOrdersQuery);
  const existingOrders = querySnapshot.docs.map(doc => ({ itemId: doc.data().itemId, supplierId: doc.data().supplierId }));

  for (const order of seedOrders) {
    if (!existingOrders.some(existingOrder => existingOrder.itemId === order.itemId && existingOrder.supplierId === order.supplierId)) {
      await createOrder(order.itemId, order.supplierId, order.quantity, order.deliveryDate);
    }
  }
};

const getOrders = (setOrders) => {
  const unsubscribe = onSnapshot(collection(db, "orders"), (querySnapshot) => {
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ ...doc.data(), orderId: doc.id });
    });
    setOrders(orders);
  });
  return unsubscribe;
};

const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, { status, updatedAt: new Date() });
};

const deleteOrder = async (orderId) => {
  await deleteDoc(doc(db, "orders", orderId));
};

export { createOrder, createSeedOrders, getOrders, updateOrderStatus, deleteOrder };
