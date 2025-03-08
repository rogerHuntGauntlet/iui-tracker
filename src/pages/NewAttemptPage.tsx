import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Fade } from '@mui/material';
import IUIDataForm from '../components/IUIDataForm';
import PregnancyChanceResult from '../components/PregnancyChanceResult';
import { IUIAttempt, PregnancyChanceResult as PregnancyChanceResultType } from '../types';
import { calculatePregnancyChances } from '../utils/pregnancyCalculator';

const NewAttemptPage: React.FC = () => {
  const [calculationResult, setCalculationResult] = useState<PregnancyChanceResultType | null>(null);
  
  const handleFormSubmit = (attempt: IUIAttempt) => {
    // Calculate pregnancy chances based on the submitted data
    const result = calculatePregnancyChances(attempt);
    setCalculationResult(result);
    
    // Here you would typically save the data to your backend or state management
    console.log('IUI attempt data:', attempt);
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
      
      {calculationResult && (
        <Fade in={true} timeout={1000}>
          <Box>
            <PregnancyChanceResult result={calculationResult} />
          </Box>
        </Fade>
      )}
      
      <Paper elevation={1} sx={{ p: 3, mt: 4, bgcolor: '#f8f9fa' }}>
        <Typography variant="h6" gutterBottom>
          About IUI Success Rates
        </Typography>
        <Typography variant="body2" paragraph>
          Intrauterine insemination (IUI) is a fertility treatment that involves placing sperm directly into a woman's uterus to facilitate fertilization. The success rate of IUI depends on various factors including age, the cause of infertility, and the use of fertility medications.
        </Typography>
        <Typography variant="body2" paragraph>
          On average, the success rate of IUI ranges from 5-20% per cycle. However, individual factors can significantly influence these chances. This calculator uses statistical models based on published medical research to provide personalized estimates.
        </Typography>
        <Typography variant="body2">
          <strong>Important:</strong> This tool provides estimates based on general statistics and is not a substitute for professional medical advice. Always consult with your fertility specialist for personalized treatment recommendations.
        </Typography>
      </Paper>
    </Container>
  );
};

export default NewAttemptPage; 