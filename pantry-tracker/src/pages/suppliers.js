import { useState } from 'react';
import SupplierForm from '../components/SupplierForm';
import SupplierList from '../components/SupplierList';
import { Grid, Typography } from '@mui/material';
import ProtectedRoute from '@/components/ProtectedRoute';

const SuppliersPage = () => {
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleUpdate = () => {
    setSelectedSupplier(null);
  };

  return (
    <div>
        <ProtectedRoute>
      <Typography variant="h4">Suppliers</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SupplierForm supplier={selectedSupplier} onUpdate={handleUpdate} />
        </Grid>
        <Grid item xs={12}>
          <SupplierList />
        </Grid>
      </Grid>
      </ProtectedRoute>
    </div>
  );
};

export default SuppliersPage;