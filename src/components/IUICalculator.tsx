import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import IUIDataForm from './IUIDataForm';
import PregnancyChanceResult from './PregnancyChanceResult';
import { IUIAttempt } from '../types';
import { calculatePregnancyChances } from '../utils/pregnancyCalculator';

const IUICalculator: React.FC = () => {
  const [calculationResult, setCalculationResult] = useState<ReturnType<typeof calculatePregnancyChances> | null>(null);

  const handleSubmit = (attempt: IUIAttempt) => {
    const result = calculatePregnancyChances(attempt);
    setCalculationResult(result);
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

      {calculationResult && (
        <PregnancyChanceResult result={calculationResult} />
      )}
    </Box>
  );
};

export default IUICalculator; 