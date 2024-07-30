'use client';

import { useEffect, useState } from 'react';
import { createSeedSuppliers } from '../utils/supplierManagement';
import { Typography, Button } from '@mui/material';

const SeedSuppliersPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedSuppliers = async () => {
    setLoading(true);
    setMessage('');
    try {
      await createSeedSuppliers();
      setMessage('Seed suppliers created successfully!');
    } catch (error) {
      setMessage('Failed to create seed suppliers: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
        handleSeedSuppliers()
    }
    // handleSeedSuppliers();
  }, []);

  return (
    <div>
      <Typography variant="h4">Seed Suppliers</Typography>
      <Button variant="contained" color="primary" onClick={handleSeedSuppliers} disabled={loading}>
        {loading ? 'Seeding...' : 'Seed Suppliers'}
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default SeedSuppliersPage;