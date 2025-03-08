import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
  Card,
  CardContent,
  Stack,
  Chip,
} from '@mui/material';
import {
  BarChart as ChartIcon,
  Security as SecurityIcon,
  Science as ScienceIcon,
  People as CommunityIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import TermsModal from '../components/TermsModal';
import IUICalculator from '../components/IUICalculator';

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  // Check if terms were previously accepted
  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted === 'true') {
      setTermsAccepted(true);
    }
  }, []);

  const handleStartCalculator = () => {
    if (!termsAccepted) {
      setShowTerms(true);
    } else {
      setShowCalculator(true);
    }
  };

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setTermsAccepted(true);
    setShowTerms(false);
    setShowCalculator(true);
  };

  // If calculator is shown, only display it
  if (showCalculator) {
    return (
      <Container maxWidth="lg">
        <IUICalculator />
      </Container>
    );
  }

  // Features section content
  const features = [
    {
      icon: <ChartIcon fontSize="large" color="primary" />,
      title: "Evidence-Based Analysis",
      description: "Advanced statistical models based on peer-reviewed medical research for accurate success rate predictions."
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: "Complete Privacy",
      description: "100% private calculations run entirely in your browser. No data storage, no tracking, no accounts needed."
    },
    {
      icon: <ScienceIcon fontSize="large" color="primary" />,
      title: "Comprehensive Factors",
      description: "Considers 15+ key factors including age, medical conditions, medications, and clinical measurements."
    },
    {
      icon: <CommunityIcon fontSize="large" color="primary" />,
      title: "Community-Driven",
      description: "Open-source project continuously improved by fertility experts, developers, and the IUI community."
    }
  ];

  return (
    <Box>
      {/* Terms Modal */}
      <TermsModal open={showTerms} onAccept={handleAcceptTerms} />

      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Calculate Your IUI Success Rate
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                Evidence-based predictions powered by medical research and machine learning
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleStartCalculator}
                  sx={{ 
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    backgroundColor: 'white',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.9)',
                    }
                  }}
                >
                  Start Calculator
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="https://github.com/rogerHuntGauntlet/iui-tracker"
                  target="_blank"
                  startIcon={<GitHubIcon />}
                  sx={{ 
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.9)',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    }
                  }}
                >
                  View on GitHub
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ position: 'relative', p: 2 }}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 3,
                    background: 'rgba(255,255,255,0.9)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h4" color="primary" gutterBottom align="center">
                    85%+
                  </Typography>
                  <Typography variant="body1" color="text.secondary" align="center">
                    Accuracy in predicting IUI success rates
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Chip label="Evidence-Based" color="primary" size="small" />
                    <Chip label="Private" color="primary" size="small" />
                    <Chip label="Free" color="primary" size="small" />
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose Our Calculator?
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Advanced technology meets medical expertise for accurate IUI success predictions
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center' }}>
                <CardContent>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trust Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom>
            Trusted by the Fertility Community
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Join thousands of individuals and medical professionals using our calculator
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  🏥 For Medical Professionals
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Evidence-based tool to support your clinical decisions and patient counseling.
                </Typography>
                <Button variant="outlined" color="primary" fullWidth>
                  Learn More
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  👥 For Patients
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Get personalized insights and recommendations for your IUI journey.
                </Typography>
                <Button variant="contained" color="primary" fullWidth onClick={handleStartCalculator}>
                  Try Calculator
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Open Source Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Open Source & Community Driven
            </Typography>
            <Typography variant="body1" paragraph>
              We believe in transparency and continuous improvement. Our calculator is open source,
              allowing the community to validate our methods and contribute to its development.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<GitHubIcon />}
              href="https://github.com/rogerHuntGauntlet/iui-tracker"
              target="_blank"
            >
              Contribute on GitHub
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
              <Typography variant="h6" gutterBottom>
                Recent Improvements
              </Typography>
              <Stack spacing={2}>
                <Typography variant="body2">✓ Enhanced success rate calculations</Typography>
                <Typography variant="body2">✓ Added support for more medical factors</Typography>
                <Typography variant="body2">✓ Improved recommendation engine</Typography>
                <Typography variant="body2">✓ Updated research references</Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LandingPage; 