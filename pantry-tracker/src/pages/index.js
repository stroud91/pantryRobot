'use client';

import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Container, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';
import Modal from '../components/Modal';
import Signin from '../components/Signin';
import Signup from '../components/Signup';

const HomePage = () => {
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
    <Container className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="bg-blue-600 w-full text-center py-4 mb-8 rounded shadow-lg">
        <Typography variant="h2" className="text-4xl font-extrabold text-white">
          Pantry Tracker
        </Typography>
        <Typography variant="body1" className="text-white mt-2">
          Manage your pantry items efficiently.
        </Typography>
      </div>
      <Grid container spacing={2} className="flex justify-center mt-8">
        {!currentUser ? (
          <>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSignUpOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setSignInOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded"
              >
                Sign In
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Link href="/profile" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Profile
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/warehouses" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Manage Warehouses
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/orders" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Manage Orders
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/suppliers" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded"
                >
                  Manage Suppliers
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
              >
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
};

export default HomePage;
