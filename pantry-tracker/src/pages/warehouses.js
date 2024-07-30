'use client';

import WarehousesPage from '../components/WarehousesPage';
import ProtectedRoute from '../components/ProtectedRoute';

const Warehouses = () => {
  return (
    <ProtectedRoute>
      <WarehousesPage />
    </ProtectedRoute>
  );
};

export default Warehouses;