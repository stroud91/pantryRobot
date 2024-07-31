'use client';

import { useAuth } from '../hooks/useAuth';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Modal from '../components/Modal';
import ProtectedRoute from '../components/ProtectedRoute';

const PantryPage = () => {
  const { currentUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdate = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <Typography variant="h4">Pantry Items</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenModal(null)}>
        Add Item
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PantryList userId={currentUser.uid} onEdit={handleOpenModal} />
        </Grid>
      </Grid>
      <Modal
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        title={selectedItem ? 'Update Item' : 'Add Item'}
        handleSave={handleUpdate}
      >
        <PantryForm item={selectedItem} onUpdate={handleUpdate} />
      </Modal>
    </ProtectedRoute>
  );
};

export default PantryPage;
