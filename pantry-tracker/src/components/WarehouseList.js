'use client';

import { useEffect, useState } from 'react';
import { getWarehouses, deleteWarehouse } from '../utils/warehouseManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const unsubscribe = getWarehouses(setWarehouses);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (warehouseId) => {
    await deleteWarehouse(warehouseId);
    setWarehouses(warehouses.filter(warehouse => warehouse.warehouseId !== warehouseId));
  };

  return (
    <Grid container spacing={2}>
      {warehouses.map(warehouse => (
        <Grid item xs={12} sm={6} md={4} key={warehouse.warehouseId}>
          <Card>
            <CardContent>
              <Typography variant="h5">{warehouse.name}</Typography>
              <Typography>Location: {warehouse.location}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(warehouse.warehouseId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default WarehouseList;
