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
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="text-2xl font-bold text-center mb-6">Warehouses</Typography>
      <div className="flex justify-center mb-4">
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => handleOpenForm()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Warehouse
        </Button>
      </div>
      <Grid container spacing={4}>
        {warehouses && warehouses.map(warehouse => (
          <Grid item xs={12} sm={6} md={4} key={warehouse.warehouseId}>
            <Card className="bg-white shadow-md rounded-lg overflow-hidden">
              <CardContent>
                <Typography variant="h5" className="font-bold">{warehouse.name}</Typography>
                <Typography>Location: {warehouse.location}</Typography>
                <div className="flex justify-between mt-4">
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleOpenForm(warehouse)}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => handleDelete(warehouse.warehouseId)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </Button>
                </div>
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
