'use client';

import { useEffect, useState  } from 'react';
import { AuthProvider } from '../hooks/useAuth';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../styles/theme';
import '../styles/globals.css';
import { seedAll } from '../utils/seedDatabase';

export default function MyApp({ Component, pageProps }) {
  const [isSeeded, setIsSeeded] = useState(false);

  useEffect(() => {
    const seedDatabase = async () => {
      try {
        await seedAll();
        console.log('Database seeding completed');
      } catch (err) {
        console.error('Database seeding failed', err);
      }
      setIsSeeded(true);
    };

    if (!isSeeded && process.env.NODE_ENV === 'development') {
      seedDatabase();
    }
  }, [isSeeded]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}