'use client';

import { useEffect, useState } from 'react';
import { getPantryItems, deletePantryItem } from '../utils/pantryItemManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const PantryList = ({ userId, onEdit }) => {
  const [pantryItems, setPantryItems] = useState([]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = getPantryItems(userId, setPantryItems);
      return () => unsubscribe();
    }
  }, [userId]);

  const handleDelete = async (itemId) => {
    await deletePantryItem(itemId);
    setPantryItems(pantryItems.filter(item => item.itemId !== itemId));
  };

  return (
    <Grid container spacing={2}>
      {pantryItems.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.itemId}>
          <Card className="bg-white shadow-md rounded-lg overflow-hidden">
            <CardContent>
              <Typography variant="h5" className="font-bold">{item.name}</Typography>
              <Typography>Quantity: {item.quantity} {item.unit}</Typography>
              <Typography>Category: {item.category}</Typography>
              <Typography>Expiration Date: {item.expirationDate.toDate().toString()}</Typography>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => onEdit(item)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit
                </Button>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => handleDelete(item.itemId)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PantryList;
