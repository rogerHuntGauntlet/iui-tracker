import React from 'react';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  Link,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Layout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <LockIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component={RouterLink} to="/" sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            flexGrow: 1,
            '&:hover': {
              textDecoration: 'none',
            }
          }}>
            IUI Success Calculator
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link
              component={RouterLink}
              to="/"
              color="inherit"
              sx={{ textDecoration: 'none' }}
            >
              Calculator
            </Link>
            <Link
              component={RouterLink}
              to="/about"
              color="inherit"
              sx={{ textDecoration: 'none' }}
            >
              About
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            {'This calculator runs entirely in your browser. '}
            {'No data is stored or transmitted. '}
            {'Built with privacy in mind.'}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            {'© '}
            {new Date().getFullYear()}
            {' IUI Success Calculator. '}
            <Link color="inherit" href="https://github.com/yourusername/iui-tracker">
              GitHub
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout; 