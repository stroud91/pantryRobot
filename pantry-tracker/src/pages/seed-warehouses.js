'use client';
import { useEffect, useState } from 'react';
import { createSeedWarehouses } from '../utils/warehouseManagement';
import { Typography, Button } from '@mui/material';

const SeedWarehousesPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedWarehouses = async () => {
    setLoading(true);
    setMessage('');
    try {
      await createSeedWarehouses();
      setMessage('Seed warehouses created successfully!');
    } catch (error) {
      setMessage('Failed to create seed warehouses: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
        handleSeedWarehouses();
      }
    // handleSeedWarehouses();
  }, []);

  return (
    <div>
      <Typography variant="h4">Seed Warehouses</Typography>
      <Button variant="contained" color="primary" onClick={handleSeedWarehouses} disabled={loading}>
        {loading ? 'Seeding...' : 'Seed Warehouses'}
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default SeedWarehousesPage;