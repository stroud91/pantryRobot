'use client';

import SuppliersPage from '../components/SuppliersPage';
import ProtectedRoute from '../components/ProtectedRoute';

const Suppliers = () => {
  return (
    <ProtectedRoute>
      <SuppliersPage />
    </ProtectedRoute>
  );
};

export default Suppliers;