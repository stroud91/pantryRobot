import { useEffect, useState } from 'react';
import { createSeedUsers } from '../utils/userManagement';
import { Typography, Button } from '@mui/material';

const SeedUsersPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSeedUsers = async () => {
    setLoading(true);
    setMessage('');
    try {
      await createSeedUsers();
      setMessage('Seed users created successfully!');
    } catch (error) {
      setMessage('Failed to create seed users: ' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Optionally, run the seeder function on component mount
    // handleSeedUsers();
  }, []);

  return (
    <div>
      <Typography variant="h4">Seed Users</Typography>
      <Button variant="contained" color="primary" onClick={handleSeedUsers} disabled={loading}>
        {loading ? 'Seeding...' : 'Seed Users'}
      </Button>
      {message && <Typography variant="body1">{message}</Typography>}
    </div>
  );
};

export default SeedUsersPage;