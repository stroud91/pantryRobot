'use client';

import { useEffect, useState } from 'react';
import { getPantryItems, deletePantryItem } from '../utils/pantryItemManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const PantryList = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = getPantryItems(currentUser.uid, setPantryItems);
      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleDelete = async (itemId) => {
    await deletePantryItem(itemId);
    setPantryItems(pantryItems.filter(item => item.itemId !== itemId));
  };

  return (
    <Grid container spacing={2}>
      {pantryItems.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.itemId}>
          <Card>
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography>Quantity: {item.quantity} {item.unit}</Typography>
              <Typography>Category: {item.category}</Typography>
              <Typography>Expiration Date: {item.expirationDate.toDate().toString()}</Typography>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(item.itemId)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PantryList;
