import { useEffect, useState } from 'react';
import { createSeedPantryItems } from '../utils/pantryItemManagement';
import { Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const SeedPantryItemsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedPantryItems = async () => {
    setLoading(true);
    setMessage('');
    try {
      await createSeedPantryItems(currentUser.uid);
      setMessage('Seed pantry items created successfully!');
    } catch (error) {
      setMessage('Failed to create seed pantry items: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Optionally, run the seeder function on component mount
    // handleSeedPantryItems();
  }, []);

  return (
    <div>
      <Typography variant="h4">Seed Pantry Items</Typography>
      <Button variant="contained" color="primary" onClick={handleSeedPantryItems} disabled={loading}>
        {loading ? 'Seeding...' : 'Seed Pantry Items'}
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default SeedPantryItemsPage;