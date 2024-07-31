'use client';

import { useState } from 'react';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';
import { Grid, Typography, Button } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';
import Modal from '../components/Modal';
import { useRouter } from 'next/router';

const SuppliersPage = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleUpdate = () => {
    setSelectedSupplier(null);
    setModalOpen(false);
  };

  const handleOpenModal = (supplier) => {
    setSelectedSupplier(supplier);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProtectedRoute>
        <Typography variant="h4" className="text-2xl font-bold text-center mb-6">Suppliers</Typography>
        <div className="flex justify-between mb-4">
        <Button variant="contained" color="secondary" onClick={() => router.back()}>
            Back
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleOpenModal(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Supplier
          </Button>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <SupplierList onEdit={handleOpenModal} />
          </Grid>
        </Grid>
        <Modal
          open={modalOpen}
          handleClose={() => setModalOpen(false)}
          title={selectedSupplier ? 'Update Supplier' : 'Add Supplier'}
          handleSave={handleUpdate}
        >
          <SupplierForm supplier={selectedSupplier} onUpdate={handleUpdate} />
        </Modal>
      </ProtectedRoute>
    </div>
  );
};

export default SuppliersPage;
