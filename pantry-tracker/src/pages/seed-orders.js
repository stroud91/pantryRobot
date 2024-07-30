'use client'
import { useEffect, useState } from 'react';
import { createSeedOrders } from '../utils/orderManagement';
import { Typography, Button } from '@mui/material';

const SeedOrdersPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedOrders = async () => {
    setLoading(true);
    setMessage('');
    try {
      await createSeedOrders();
      setMessage('Seed orders created successfully!');
    } catch (error) {
      setMessage('Failed to create seed orders: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
        handleSeedOrders()
    }
    // handleSeedOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4">Seed Orders</Typography>
      <Button variant="contained" color="primary" onClick={handleSeedOrders} disabled={loading}>
        {loading ? 'Seeding...' : 'Seed Orders'}
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default SeedOrdersPage;