'use client';

import { useState } from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import Modal from '../components/Modal';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <Box className="container mx-auto px-4 py-8">
        <Typography variant="h4" className="text-3xl font-bold mb-4">Orders</Typography>
        <Box className="flex justify-between mb-4">
          <Button variant="contained" color="secondary" onClick={() => router.back()}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal(null)}>
            Add Order
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OrderList onEdit={handleOpenModal} />
          </Grid>
        </Grid>
        <Modal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          title={selectedOrder ? 'Update Order' : 'Add Order'}
          handleSave={handleUpdate}
        >
          <OrderForm order={selectedOrder} onUpdate={handleUpdate} />
        </Modal>
      </Box>
    </ProtectedRoute>
  );
};

export default OrdersPage;
