import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Divider,
  Alert,
} from '@mui/material';
import { IUICalculatorInput } from '../types';

// Validation schema
const validationSchema = Yup.object({
  age: Yup.number()
    .required('Age is required')
    .min(18, 'Age must be at least 18')
    .max(50, 'Age must be at most 50'),
  spermCount: Yup.number()
    .required('Sperm count is required')
    .min(0, 'Sperm count cannot be negative'),
  spermMotility: Yup.number()
    .required('Sperm motility is required')
    .min(0, 'Sperm motility cannot be negative')
    .max(100, 'Sperm motility cannot exceed 100%'),
  follicleCount: Yup.number()
    .required('Follicle count is required')
    .min(0, 'Follicle count cannot be negative')
    .max(5, 'Maximum 5 follicles can be entered'),
  endometriumThickness: Yup.number()
    .required('Endometrium thickness is required')
    .min(0, 'Endometrium thickness cannot be negative'),
  bmi: Yup.number()
    .required('BMI is required')
    .min(10, 'BMI must be at least 10')
    .max(50, 'BMI must be at most 50'),
});

// Calculate success probability based on input factors
const calculateSuccessProbability = (values: IUICalculatorInput): number => {
  // Base success rate (from medical literature)
  let baseRate = 0.15; // 15% base success rate

  // Age factor (decreases with age)
  const ageFactor = Math.max(0, 1 - (values.age - 25) * 0.03);

  // Sperm quality factor
  const spermFactor = (values.spermCount / 15) * (values.spermMotility / 40);

  // Follicle factor (optimal is 2-3 follicles)
  const follicleOptimal = values.follicleCount >= 2 && values.follicleCount <= 3;
  const follicleFactor = follicleOptimal ? 1.2 : 0.8;

  // Endometrium thickness factor (optimal is 7-14mm)
  const endoOptimal = values.endometriumThickness >= 7 && values.endometriumThickness <= 14;
  const endoFactor = endoOptimal ? 1.2 : 0.8;

  // BMI factor (optimal is 18.5-24.9)
  const bmiOptimal = values.bmi >= 18.5 && values.bmi <= 24.9;
  const bmiFactor = bmiOptimal ? 1.1 : 0.9;

  // Calculate final probability
  let probability = baseRate * ageFactor * spermFactor * follicleFactor * endoFactor * bmiFactor;

  // Cap probability between 0% and 60%
  return Math.min(Math.max(probability, 0), 0.6);
};

// Generate recommendations based on input values
const generateRecommendations = (values: IUICalculatorInput): string[] => {
  const recommendations = [];

  if (values.age > 35) {
    recommendations.push("Consider discussing additional fertility treatments with your doctor.");
  }

  if (values.spermCount < 15) {
    recommendations.push("Sperm count is below optimal levels. Discuss sperm quality improvement options with your doctor.");
  }

  if (values.spermMotility < 40) {
    recommendations.push("Sperm motility is below optimal levels. Consider lifestyle changes that may improve sperm quality.");
  }

  if (values.follicleCount > 3) {
    recommendations.push("Multiple follicles increase the risk of multiple pregnancy. Discuss this with your doctor.");
  }

  if (values.endometriumThickness < 7) {
    recommendations.push("Endometrial lining is thinner than optimal. Discuss options to improve endometrial thickness.");
  }

  if (values.bmi < 18.5 || values.bmi > 24.9) {
    recommendations.push("BMI is outside the optimal range. Consider discussing weight management with your healthcare provider.");
  }

  return recommendations;
};

const IUICalculator: React.FC = () => {
  const [result, setResult] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const formik = useFormik<IUICalculatorInput>({
    initialValues: {
      age: 30,
      spermCount: 15,
      spermMotility: 40,
      follicleCount: 2,
      endometriumThickness: 8,
      bmi: 22,
    },
    validationSchema,
    onSubmit: (values) => {
      const probability = calculateSuccessProbability(values);
      setResult(probability);
      setRecommendations(generateRecommendations(values));
    },
  });

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          IUI Success Calculator
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Enter your parameters below to calculate estimated success probability.
          All calculations are performed locally in your browser - no data is stored or transmitted.
        </Typography>

        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="age"
                name="age"
                label="Age"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="bmi"
                name="bmi"
                label="BMI"
                type="number"
                value={formik.values.bmi}
                onChange={formik.handleChange}
                error={formik.touched.bmi && Boolean(formik.errors.bmi)}
                helperText={formik.touched.bmi && formik.errors.bmi}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Chip label="Sperm Parameters" />
              </Divider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="spermCount"
                name="spermCount"
                label="Sperm Count (million/ml)"
                type="number"
                value={formik.values.spermCount}
                onChange={formik.handleChange}
                error={formik.touched.spermCount && Boolean(formik.errors.spermCount)}
                helperText={formik.touched.spermCount && formik.errors.spermCount}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="spermMotility"
                name="spermMotility"
                label="Sperm Motility (%)"
                type="number"
                value={formik.values.spermMotility}
                onChange={formik.handleChange}
                error={formik.touched.spermMotility && Boolean(formik.errors.spermMotility)}
                helperText={formik.touched.spermMotility && formik.errors.spermMotility}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 2 }}>
                <Chip label="Follicle & Endometrium" />
              </Divider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="follicleCount"
                name="follicleCount"
                label="Number of Follicles"
                type="number"
                value={formik.values.follicleCount}
                onChange={formik.handleChange}
                error={formik.touched.follicleCount && Boolean(formik.errors.follicleCount)}
                helperText={formik.touched.follicleCount && formik.errors.follicleCount}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="endometriumThickness"
                name="endometriumThickness"
                label="Endometrium Thickness (mm)"
                type="number"
                value={formik.values.endometriumThickness}
                onChange={formik.handleChange}
                error={formik.touched.endometriumThickness && Boolean(formik.errors.endometriumThickness)}
                helperText={formik.touched.endometriumThickness && formik.errors.endometriumThickness}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                Calculate Success Probability
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {result !== null && (
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Estimated Success Probability
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            {(result * 100).toFixed(1)}%
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recommendations
            </Typography>
            {recommendations.map((rec, index) => (
              <Alert severity="info" sx={{ mb: 1 }} key={index}>
                {rec}
              </Alert>
            ))}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            Note: This is an estimate based on statistical data and should not be considered medical advice.
            Always consult with your fertility specialist for personalized recommendations.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default IUICalculator; 