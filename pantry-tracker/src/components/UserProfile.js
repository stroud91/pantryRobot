'use client';

import { Typography, Button, Menu, MenuItem, Grid, Card, CardContent } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      // Mock API call to fetch user details
      const fetchUserDetails = async () => {
        // This is a placeholder. Replace with actual API call.
        const details = {
          name: 'John Doe',
          email: currentUser.email,
          phone: '123-456-7890',
          address: '123 Main St, City, Country',
        };
        setUserDetails(details);
      };

      fetchUserDetails();
    }
  }, [currentUser]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/signin');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h4" className="text-3xl font-bold text-center mb-8">User Profile</Typography>
      {currentUser ? (
        <div className="flex flex-col items-center">
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            {currentUser.email}
          </Button>
          <Button variant="contained" color="secondary" onClick={() => router.back()}>
            Back
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>

          {userDetails && (
            <Card className="w-full max-w-md mt-4 shadow-lg">
              <CardContent>
                <Typography variant="h6" className="font-bold mb-2">Name: {userDetails.name}</Typography>
                <Typography variant="body1" className="mb-2">Email: {userDetails.email}</Typography>
                <Typography variant="body1" className="mb-2">Phone: {userDetails.phone}</Typography>
                <Typography variant="body1">Address: {userDetails.address}</Typography>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <Typography variant="body1">Not logged in</Typography>
      )}
    </div>
  );
};

export default UserProfile;
