'use client';

import { Typography, Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import PantryList from './PantryList';
const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

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
    <div>
      <Typography variant="h4">User Profile</Typography>
      {currentUser ? (
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            {currentUser.email}
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
            <PantryList userId={currentUser.uid} />
          </Menu>
        </div>
      ) : (
        <Typography variant="body1">Not logged in</Typography>
      )}
    </div>
  );
};

export default UserProfile;