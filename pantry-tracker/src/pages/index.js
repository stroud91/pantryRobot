'use client';

import Link from 'next/link';
import { Typography, Button, Grid } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div>
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
          <Grid item>
            <Link href="/profile" passHref>
              <Button variant="contained" color="primary">Profile</Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </div>
  );
}