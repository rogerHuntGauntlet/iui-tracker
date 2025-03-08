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
import HistoryPage from './pages/HistoryPage';

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
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/calculator" element={<IUICalculator />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// About page with enhanced marketing content
const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        About IUI Success Calculator
      </Typography>
      
      <Typography variant="h5" color="primary" paragraph>
        Empowering Your Fertility Journey with Data-Driven Insights
      </Typography>
      
      <Typography variant="body1" paragraph>
        IUI Success Calculator is an advanced, open-source tool that helps estimate pregnancy chances for 
        intrauterine insemination (IUI) procedures based on your specific circumstances. Built with cutting-edge 
        technology and backed by medical research, our calculator provides personalized insights while maintaining 
        complete privacy.
      </Typography>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Advanced Technology
        </Typography>
        <Typography variant="body1" paragraph>
          Our application leverages sophisticated statistical models and machine learning algorithms to analyze 
          15+ key factors that influence IUI success rates. This comprehensive approach ensures highly accurate 
          predictions tailored to your unique situation.
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Privacy First
        </Typography>
        <Typography variant="body1" paragraph>
          We understand the sensitive nature of fertility treatment data. That's why our calculator runs entirely 
          in your browser - no data storage, no login required, and absolutely no tracking. Your information 
          remains completely private and secure.
        </Typography>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Open Source Excellence
        </Typography>
        <Typography variant="body1" paragraph>
          As an open-source project, we believe in the power of community collaboration. Our success calculator 
          is continuously improved by contributions from:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Medical professionals refining success rate calculations" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Developers enhancing features and user experience" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="IUI patients sharing valuable insights" />
          </ListItem>
          <ListItem>
            <ListItemIcon><CheckCircleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Researchers contributing latest findings" />
          </ListItem>
        </List>
      </Box>

      <Box sx={{ my: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Medical Disclaimer
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
          This application provides estimates based on statistical data and should not be considered a substitute 
          for professional medical advice. The actual success rates may vary based on individual circumstances. 
          Always consult with your fertility specialist for personalized treatment recommendations.
        </Typography>
      </Box>

      <Box sx={{ mt: 6, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/calculator')}
        >
          Try Calculator
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          href="https://github.com/yourusername/iui-tracker"
          target="_blank"
          startIcon={<GitHubIcon />}
        >
          View on GitHub
        </Button>
      </Box>
    </Container>
  );
};

export default App;
