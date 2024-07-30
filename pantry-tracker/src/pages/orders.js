'use client';

import OrdersPage from '../components/OrdersPage';
import ProtectedRoute from '../components/ProtectedRoute';

const Orders = () => {
  return (
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  );
};

export default Orders;