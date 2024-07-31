'use client';

import { useState, useEffect } from 'react';
import { getWarehouses, deleteWarehouse } from '../utils/warehouseManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import Modal from '../components/Modal';
import WarehouseForm from '../components/WarehouseForm';

const WarehousePage = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const fetchWarehouses = async () => {
      const warehousesList = await getWarehouses();
      setWarehouses(warehousesList);
    };
    fetchWarehouses();
  }, []);

  const handleOpenForm = (warehouse = null) => {
    setSelectedWarehouse(warehouse);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedWarehouse(null);
  };

  const handleSave = async () => {
    setFormOpen(false);
    const fetchWarehouses = async () => {
      const warehousesList = await getWarehouses();
      setWarehouses(warehousesList);
    };
    fetchWarehouses();
  };

  const handleDelete = async (warehouseId) => {
    await deleteWarehouse(warehouseId);
    setWarehouses(warehouses.filter(warehouse => warehouse.warehouseId !== warehouseId));
  };

  return (
    <div>
      <Typography variant="h4">Warehouses</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
        Add Warehouse
      </Button>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {warehouses && warehouses.map(warehouse => (
          <Grid item xs={12} sm={6} md={4} key={warehouse.warehouseId}>
            <Card>
              <CardContent>
                <Typography variant="h5">{warehouse.name}</Typography>
                <Typography>Location: {warehouse.location}</Typography>
                <Button variant="contained" color="secondary" onClick={() => handleOpenForm(warehouse)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDelete(warehouse.warehouseId)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal 
        open={formOpen} 
        handleClose={handleCloseForm} 
        title={selectedWarehouse ? 'Edit Warehouse' : 'Add Warehouse'}
        handleSave={handleSave}
      >
        <WarehouseForm warehouse={selectedWarehouse} onUpdate={handleSave} />
      </Modal>
    </div>
  );
};

export default WarehousePage;
