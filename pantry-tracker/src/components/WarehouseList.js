'use client';

import { useEffect, useState } from 'react';
import { getWarehouses, deleteWarehouse } from '../utils/warehouseManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const WarehouseList = ({ onEdit }) => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      const warehousesList = await getWarehouses();
      setWarehouses(warehousesList);
    };
    fetchWarehouses();
  }, []);

  const handleDelete = async (warehouseId) => {
    await deleteWarehouse(warehouseId);
    setWarehouses(warehouses.filter(warehouse => warehouse.warehouseId !== warehouseId));
  };

  return (
    <Grid container spacing={4}>
      {warehouses.map(warehouse => (
        <Grid item xs={12} sm={6} md={4} key={warehouse.warehouseId}>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent>
              <Typography variant="h5" className="font-bold">{warehouse.name}</Typography>
              <Typography>Location: {warehouse.location}</Typography>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onEdit(warehouse)}
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
  );
};

export default WarehouseList;
