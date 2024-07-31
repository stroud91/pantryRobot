'use client';

import { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplier } from '../utils/supplierManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const unsubscribe = getSuppliers(setSuppliers);
    return () => unsubscribe();
  }, []);

  const handleDelete = async (supplierId) => {
    await deleteSupplier(supplierId);
    setSuppliers(suppliers.filter(supplier => supplier.supplierId !== supplierId));
  };

  return (
    <Grid container spacing={2}>
      {suppliers.map(supplier => (
        <Grid item xs={12} sm={6} md={4} key={supplier.supplierId}>
          <Card>
            <CardContent>
              <Typography variant="h5">{supplier.name}</Typography>
              <Typography>Contact Info: {supplier.contactInfo}</Typography>
              <Typography>Address: {supplier.address}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(supplier.supplierId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SupplierList;
