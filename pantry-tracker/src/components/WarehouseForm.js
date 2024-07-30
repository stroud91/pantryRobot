'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
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
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {warehouse ? 'Update' : 'Add'} Warehouse
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WarehouseForm;