'use client';

import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Container, Typography, Button, Grid } from '@mui/material';

export default function HomePage() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Typography variant="h2">Welcome to Pantry Tracker</Typography>
      <Typography variant="body1">Manage your pantry items efficiently.</Typography>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        {!currentUser ? (
          <>
            <Grid item>
              <Link href="/signup" passHref>
                <Button variant="contained" color="primary">Sign Up</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signin" passHref>
                <Button variant="contained" color="primary">Sign In</Button>
              </Link>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Link href="/profile" passHref>
                <Button variant="contained" color="primary">Profile</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/warehouses" passHref>
                <Button variant="contained" color="primary">Manage Warehouses</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/orders" passHref>
                <Button variant="contained" color="primary">Manage Orders</Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/suppliers" passHref>
                <Button variant="contained" color="primary">Manage Suppliers</Button>
              </Link>
            </Grid>
            {/* Add other links as needed */}
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}