import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { purple, pink } from '@mui/material/colors';
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import { CheckCircle as CheckCircleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import IUICalculator from './components/IUICalculator';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2D3B8E', // Professional deep blue
      light: '#4355B5',
      dark: '#1C2864',
    },
    secondary: {
      main: '#E6447D', // Warm pink
      light: '#FF6B9B',
      dark: '#B31E55',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.25rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1.125rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: '0.00938em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(45, 59, 142, 0.12)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(45, 59, 142, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/calculator" element={<IUICalculator />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
