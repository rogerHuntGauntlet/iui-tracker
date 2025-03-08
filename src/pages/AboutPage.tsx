import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

const AboutPage: React.FC = () => {
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
          href="https://github.com/rogerHuntGauntlet/iui-tracker"
          target="_blank"
          startIcon={<GitHubIcon />}
        >
          View on GitHub
        </Button>
      </Box>
    </Container>
  );
};

export default AboutPage; 