'use client';

import { useState, useEffect } from 'react';
import { TextField, Grid, Button } from '@mui/material';
import { createWarehouse, updateWarehouse } from '../utils/warehouseManagement';

const WarehouseForm = ({ warehouse, onUpdate }) => {
  const [name, setName] = useState(warehouse?.name || '');
  const [location, setLocation] = useState(warehouse?.location || '');

  useEffect(() => {
    if (warehouse) {
      setName(warehouse.name);
      setLocation(warehouse.location);
    }
  }, [warehouse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWarehouse = { name, location };

    if (warehouse) {
      await updateWarehouse(warehouse.warehouseId, newWarehouse);
    } else {
      await createWarehouse(name, location);
    }
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className="text-center">
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            {warehouse ? 'Update' : 'Add'} Warehouse
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WarehouseForm;
