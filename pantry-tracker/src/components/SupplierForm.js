'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createSupplier, updateSupplier } from '../utils/supplierManagement';

const SupplierForm = ({ supplier, onUpdate }) => {
  const [name, setName] = useState(supplier?.name || '');
  const [contactInfo, setContactInfo] = useState(supplier?.contactInfo || '');
  const [address, setAddress] = useState(supplier?.address || '');

  useEffect(() => {
    if (supplier) {
      setName(supplier.name);
      setContactInfo(supplier.contactInfo);
      setAddress(supplier.address);
    }
  }, [supplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSupplier = { name, contactInfo, address };

    if (supplier) {
      await updateSupplier(supplier.supplierId, newSupplier);
    } else {
      await createSupplier(name, contactInfo, address);
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
            label="Contact Info"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} className="text-center">
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            {supplier ? 'Update' : 'Add'} Supplier
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SupplierForm;
