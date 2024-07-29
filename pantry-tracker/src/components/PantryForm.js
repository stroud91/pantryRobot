import { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { createPantryItem, updatePantryItem } from '../utils/pantryItemManagement';

const PantryForm = ({ item, onUpdate }) => {
  const [name, setName] = useState(item?.name || '');
  const [quantity, setQuantity] = useState(item?.quantity || '');
  const [unit, setUnit] = useState(item?.unit || '');
  const [expirationDate, setExpirationDate] = useState(item?.expirationDate ? item.expirationDate.toDate().toISOString().split('T')[0] : '');
  const [category, setCategory] = useState(item?.category || '');

  useEffect(() => {
    if (item) {
      setName(item.name);
      setQuantity(item.quantity);
      setUnit(item.unit);
      setExpirationDate(item.expirationDate ? item.expirationDate.toDate().toISOString().split('T')[0] : '');
      setCategory(item.category);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, quantity, unit, expirationDate: new Date(expirationDate), category, userId: "CURRENT_USER_ID" };

    if (item) {
      await updatePantryItem(item.itemId, newItem);
    } else {
      await createPantryItem(newItem);
    }
    onUpdate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Expiration Date"
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {item ? 'Update' : 'Add'} Item
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PantryForm;