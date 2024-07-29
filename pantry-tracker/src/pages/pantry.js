import { useAuth } from '../contexts/AuthContext';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import { useState } from 'react';
import { Grid, Typography } from '@mui/material';

const PantryPage = () => {
  const { currentUser } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleUpdate = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <Typography variant="h4">Pantry Items</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <PantryForm item={selectedItem} onUpdate={handleUpdate} />
        </Grid>
        <Grid item xs={12}>
          <PantryList userId={currentUser.uid} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PantryPage;