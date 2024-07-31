'use client';

import { useState } from 'react';
import { Typography, Button, Grid, Box } from '@mui/material';
import Modal from '../components/Modal';
import WarehouseForm from '../components/WarehouseForm';
import WarehouseList from '../components/WarehouseList';
import ProtectedRoute from '../components/ProtectedRoute';
import { useRouter } from 'next/router';

const WarehousesPage = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = () => {
    setSelectedWarehouse(null);
    setModalOpen(false);
  };

  const handleOpenModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setModalOpen(true);
  };

  return (
    <ProtectedRoute>
      <Box className="container mx-auto px-4 py-8">
        <Typography variant="h4" className="text-3xl font-bold mb-4">Warehouses</Typography>
        <Box className="flex justify-between mb-4">
          <Button variant="contained" color="secondary" onClick={() => router.back()}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => handleOpenModal(null)}>
            Add Warehouse
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <WarehouseList onEdit={handleOpenModal} />
          </Grid>
        </Grid>
        <Modal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          title={selectedWarehouse ? 'Update Warehouse' : 'Add Warehouse'}
          handleSave={handleUpdate}
        >
          <WarehouseForm warehouse={selectedWarehouse} onUpdate={handleUpdate} />
        </Modal>
      </Box>
    </ProtectedRoute>
  );
};

export default WarehousesPage;
