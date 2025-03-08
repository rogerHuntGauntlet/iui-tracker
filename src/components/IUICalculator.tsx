import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import IUIDataForm from './IUIDataForm';
import { IUIAttempt } from '../types';
import PregnancyChanceResult from './PregnancyChanceResult';
import { calculatePregnancyChances } from '../utils/pregnancyCalculator';

const IUICalculator: React.FC = () => {
  const handleFormSubmit = (attempt: IUIAttempt) => {
    const result = calculatePregnancyChances(attempt);
    console.log('Calculation result:', result);
    // Here you would typically update state to show the result
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Calculate IUI Success Probability
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Enter your IUI procedure details to calculate estimated pregnancy chances and receive personalized recommendations.
        </Typography>
      </Box>

      <IUIDataForm onSubmit={handleFormSubmit} />
    </Container>
  );
};

export default IUICalculator; 