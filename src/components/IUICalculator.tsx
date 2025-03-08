import React, { useState } from 'react';
import { Box, Paper, Typography, Alert } from '@mui/material';
import IUIDataForm from './IUIDataForm';
import { IUIAttempt } from '../types';

const IUICalculator: React.FC = () => {
  const [result, setResult] = useState<{ probability: number } | null>(null);

  const handleSubmit = (attempt: IUIAttempt) => {
    if (attempt.successProbability !== undefined) {
      setResult({ probability: attempt.successProbability });
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        IUI Success Calculator
      </Typography>
      
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Enter your details below to calculate your estimated success probability.
        All calculations are performed locally in your browser - no data is saved or transmitted.
      </Typography>

      <IUIDataForm onSubmit={handleSubmit} />

      {result && (
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Calculated Success Probability
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Based on the provided information, your estimated success probability is:
          </Alert>
          <Typography variant="h3" color="primary" align="center" sx={{ my: 3 }}>
            {(result.probability * 100).toFixed(1)}%
          </Typography>
          <Alert severity="warning">
            This is a statistical estimate based on available research. Individual results may vary.
            Always consult with your healthcare provider for personalized medical advice.
          </Alert>
        </Paper>
      )}
    </Box>
  );
};

export default IUICalculator; 