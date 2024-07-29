import { useEffect, useState } from 'react';
import { getPantryItems, deletePantryItem } from '../utils/pantryItemManagement';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const PantryList = ({ userId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const itemsList = await getPantryItems(userId);
      setItems(itemsList);
    };
    fetchItems();
  }, [userId]);

  const handleDelete = async (itemId) => {
    await deletePantryItem(itemId);
    setItems(items.filter(item => item.itemId !== itemId));
  };

  return (
    <Grid container spacing={2}>
      {items.map(item => (
        <Grid item xs={12} sm={6} md={4} key={item.itemId}>
          <Card>
            <CardContent>
              <Typography variant="h5">{item.name}</Typography>
              <Typography>Quantity: {item.quantity} {item.unit}</Typography>
              <Typography>Expires: {item.expirationDate.toDate().toString()}</Typography>
              <Typography>Category: {item.category}</Typography>
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