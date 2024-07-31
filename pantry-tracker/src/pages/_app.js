'use client';
import { useEffect } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css';
import { seedAll } from '../utils/seedDatabase';

export default function MyApp({ Component, pageProps }) {

  useEffect(() => {
    
    const seedDatabase = async () => {
      try {
        await seedAll();
        console.log('Database seeding completed');
      } catch (err) {
        console.error('Database seeding failed', err);
      }
    };

    if (process.env.NODE_ENV === 'development') {
      seedDatabase();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}