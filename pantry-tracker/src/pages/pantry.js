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
      <div className="container mx-auto px-4 py-8">
        <Typography variant="h4" className="text-2xl font-bold text-center mb-6">Pantry Items</Typography>
        <div className="flex justify-center mb-4">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => handleOpenModal(null)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Item
          </Button>
        </div>
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
      </div>
    </ProtectedRoute>
  );
};

export default PantryPage;
