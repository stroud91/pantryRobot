'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '../utils/userManagement';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.userId}>
            <Card>
              <CardContent>
                <Typography>Email: {user.email}</Typography>
                <Typography>User ID: {user.userId}</Typography>
                <Typography>Created At: {user.createdAt.toDate().toString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UsersPage;