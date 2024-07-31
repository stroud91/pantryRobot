'use client';

import { useState } from 'react';
import WarehouseForm from '../components/WarehouseForm';
import WarehouseList from '../components/WarehouseList';
import { Grid, Typography } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRoute';

const WarehousesPage = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  const handleUpdate = () => {
    setSelectedWarehouse(null);
  };

  return (
    <ProtectedRoute>
      <Typography variant="h4">Warehouses</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <WarehouseForm warehouse={selectedWarehouse} onUpdate={handleUpdate} />
        </Grid>
        <Grid item xs={12}>
          <WarehouseList />
        </Grid>
      </Grid>
    </ProtectedRoute>
  );
};

export default WarehousesPage;
