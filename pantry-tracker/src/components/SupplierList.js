'use client';

import { useEffect, useState } from 'react';
import { getSuppliers, deleteSupplier } from '../utils/supplierManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const SupplierList = ({ onEdit }) => {
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
    <Grid container spacing={4}>
      {suppliers.map(supplier => (
        <Grid item xs={12} sm={6} md={4} key={supplier.supplierId}>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent>
              <Typography variant="h5" className="font-bold">{supplier.name}</Typography>
              <Typography>Contact Info: {supplier.contactInfo}</Typography>
              <Typography>Address: {supplier.address}</Typography>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onEdit(supplier)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleDelete(supplier.supplierId)}
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

export default SupplierList;
