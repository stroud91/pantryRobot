'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Container, Typography, Button, Grid } from '@mui/material';
import Modal from '../components/Modal';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

export default function HomePage() {
  const { currentUser, logout } = useAuth();
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

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
              <Button variant="contained" color="primary" onClick={() => setSignUpOpen(true)}>Sign Up</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setSignInOpen(true)}>Sign In</Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Button variant="contained" color="primary">Profile</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">Manage Warehouses</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">Manage Orders</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">Manage Suppliers</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <Modal open={signInOpen} handleClose={() => setSignInOpen(false)} title="Sign In">
        <Signin handleClose={() => setSignInOpen(false)} />
      </Modal>
      <Modal open={signUpOpen} handleClose={() => setSignUpOpen(false)} title="Sign Up">
        <Signup handleClose={() => setSignUpOpen(false)} />
      </Modal>
    </Container>
  );
}
