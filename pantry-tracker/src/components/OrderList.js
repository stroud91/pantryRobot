'use client';

import { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../utils/orderManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const OrderList = ({ onEdit }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = getOrders(setOrders);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (orderId) => {
    await deleteOrder(orderId);
    setOrders(orders.filter(order => order.orderId !== orderId));
  };

  return (
    <Grid container spacing={2}>
      {orders.map(order => (
        <Grid item xs={12} sm={6} md={4} key={order.orderId}>
          <Card>
            <CardContent>
              <Typography variant="h5">Order ID: {order.orderId}</Typography>
              <Typography>Item ID: {order.itemId}</Typography>
              <Typography>Supplier ID: {order.supplierId}</Typography>
              <Typography>Quantity: {order.quantity}</Typography>
              <Typography>Delivery Date: {order.deliveryDate.toDate().toString()}</Typography>
              <Typography>Status: {order.status}</Typography>
              <Button variant="contained" color="primary" onClick={() => onEdit(order)}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(order.orderId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderList;
