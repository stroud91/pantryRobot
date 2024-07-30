'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createOrder, updateOrderStatus } from '../utils/orderManagement';

const OrderForm = ({ order, onUpdate }) => {
  const [itemId, setItemId] = useState(order?.itemId || '');
  const [supplierId, setSupplierId] = useState(order?.supplierId || '');
  const [quantity, setQuantity] = useState(order?.quantity || '');
  const [deliveryDate, setDeliveryDate] = useState(order?.deliveryDate ? order.deliveryDate.toDate().toISOString().split('T')[0] : '');
  const [status, setStatus] = useState(order?.status || 'pending');

  useEffect(() => {
    if (order) {
      setItemId(order.itemId);
      setSupplierId(order.supplierId);
      setQuantity(order.quantity);
      setDeliveryDate(order.deliveryDate ? order.deliveryDate.toDate().toISOString().split('T')[0] : '');
      setStatus(order.status);
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = { itemId, supplierId, quantity, deliveryDate: new Date(deliveryDate), status };

    if (order) {
      await updateOrderStatus(order.orderId, newOrder.status);
    } else {
      await createOrder(itemId, supplierId, quantity, deliveryDate);
    }
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Item ID"
            value={itemId}
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Supplier ID"
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Delivery Date"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {order ? 'Update' : 'Add'} Order
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderForm;