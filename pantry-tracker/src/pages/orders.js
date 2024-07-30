'use client';

import { useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import { Grid, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleUpdate = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
        <ProtectedRoute>
      <Typography variant="h4">Orders</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <OrderForm order={selectedOrder} onUpdate={handleUpdate} />
        </Grid>
        <Grid item xs={12}>
          <OrderList />
        </Grid>
      </Grid>
      </ProtectedRoute>
    </div>
  );
};

export default OrdersPage;

