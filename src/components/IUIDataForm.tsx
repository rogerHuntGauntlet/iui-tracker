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
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { IUIAttempt } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { SelectChangeEvent } from '@mui/material/Select';

// Common medications used in IUI
const COMMON_MEDICATIONS = [
  'Clomid (Clomiphene)',
  'Letrozole (Femara)',
  'Gonadotropins (Follistim, Gonal-F)',
  'Menopur',
  'Ovidrel (trigger shot)',
  'Progesterone',
  'None / Natural cycle'
];

interface IUIDataFormProps {
  onSubmit: (attempt: IUIAttempt) => void;
  initialData?: Partial<IUIAttempt>;
}

const IUIDataForm: React.FC<IUIDataFormProps> = ({ onSubmit, initialData = {} }) => {
  const [follicleCount, setFollicleCount] = useState(initialData.follicleCount || 1);
  
  const validationSchema = Yup.object({
    date: Yup.date().required('Date is required'),
    age: Yup.number()
      .required('Age is required')
      .min(18, 'Age must be at least 18')
      .max(50, 'Age must be at most 50'),
    partnerSpermCount: Yup.number()
      .required('Sperm count is required')
      .min(0, 'Sperm count cannot be negative'),
    partnerSpermMotility: Yup.number()
      .required('Sperm motility is required')
      .min(0, 'Sperm motility cannot be negative')
      .max(100, 'Sperm motility cannot exceed 100%'),
    follicleCount: Yup.number()
      .required('Follicle count is required')
      .min(0, 'Follicle count cannot be negative'),
    endometriumThickness: Yup.number()
      .required('Endometrium thickness is required')
      .min(0, 'Endometrium thickness cannot be negative'),
    previousPregnancies: Yup.number()
      .required('Previous pregnancies is required')
      .min(0, 'Previous pregnancies cannot be negative'),
    previousMiscarriages: Yup.number()
      .required('Previous miscarriages is required')
      .min(0, 'Previous miscarriages cannot be negative'),
    previousIUIAttempts: Yup.number()
      .required('Previous IUI attempts is required')
      .min(0, 'Previous IUI attempts cannot be negative'),
    bmi: Yup.number()
      .required('BMI is required')
      .min(10, 'BMI must be at least 10')
      .max(50, 'BMI must be at most 50'),
    notes: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      date: initialData.date || '',
      age: initialData.age || 30,
      partnerSpermCount: initialData.partnerSpermCount || 0,
      partnerSpermMotility: initialData.partnerSpermMotility || 0,
      follicleCount: initialData.follicleCount || 1,
      follicleSize: initialData.follicleSize || Array(initialData.follicleCount || 1).fill(0),
      endometriumThickness: initialData.endometriumThickness || 0,
      medicationsUsed: initialData.medicationsUsed || [],
      previousPregnancies: initialData.previousPregnancies || 0,
      previousMiscarriages: initialData.previousMiscarriages || 0,
      previousIUIAttempts: initialData.previousIUIAttempts || 0,
      bmi: initialData.bmi || 22,
      amhLevel: initialData.amhLevel || '',
      notes: initialData.notes || '',
    },
    validationSchema,
    onSubmit: (values) => {
      // Create a new IUI attempt object
      const newAttempt: IUIAttempt = {
        id: initialData.id || uuidv4(), // Generate ID if not editing
        ...values,
        // Convert string to number if needed
        amhLevel: values.amhLevel ? Number(values.amhLevel) : undefined,
        // Ensure follicle sizes are trimmed to actual follicle count
        follicleSize: values.follicleSize.slice(0, values.follicleCount),
      };
      
      onSubmit(newAttempt);
    },
  });

  // Handle follicle count changes
  const handleFollicleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(event.target.value, 10);
    setFollicleCount(newCount);
    
    // Update formik values
    const newSizes = [...formik.values.follicleSize];
    if (newCount > formik.values.follicleSize.length) {
      // Add new follicles with size 0
      for (let i = formik.values.follicleSize.length; i < newCount; i++) {
        newSizes.push(0);
      }
    } else {
      // Remove excess follicles
      newSizes.splice(newCount);
    }
    
    formik.setFieldValue('follicleCount', newCount);
    formik.setFieldValue('follicleSize', newSizes);
  };

  // Handle individual follicle size changes
  const handleFollicleSizeChange = (index: number, value: number) => {
    const newSizes = [...formik.values.follicleSize];
    newSizes[index] = value;
    formik.setFieldValue('follicleSize', newSizes);
  };

  // Handle medication selection
  const handleMedicationChange = (event: SelectChangeEvent<string[]>) => {
    formik.setFieldValue('medicationsUsed', event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {initialData.id ? 'Edit IUI Attempt' : 'New IUI Attempt'}
      </Typography>
      
      <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="date"
              name="date"
              label="IUI Date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="age"
              name="age"
              label="Age"
              type="number"
              value={formik.values.age}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.age && Boolean(formik.errors.age)}
              helperText={formik.touched.age && formik.errors.age}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              id="bmi"
              name="bmi"
              label="BMI"
              type="number"
              value={formik.values.bmi}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bmi && Boolean(formik.errors.bmi)}
              helperText={formik.touched.bmi && formik.errors.bmi}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>
              <Chip label="Sperm Parameters" />
            </Divider>
          </Grid>

          {/* Sperm Parameters */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="partnerSpermCount"
              name="partnerSpermCount"
              label="Sperm Count (million/ml)"
              type="number"
              value={formik.values.partnerSpermCount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.partnerSpermCount && Boolean(formik.errors.partnerSpermCount)}
              helperText={formik.touched.partnerSpermCount && formik.errors.partnerSpermCount}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="partnerSpermMotility"
              name="partnerSpermMotility"
              label="Sperm Motility (%)"
              type="number"
              value={formik.values.partnerSpermMotility}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.partnerSpermMotility && Boolean(formik.errors.partnerSpermMotility)}
              helperText={formik.touched.partnerSpermMotility && formik.errors.partnerSpermMotility}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>
              <Chip label="Follicle Information" />
            </Divider>
          </Grid>

          {/* Follicle Information */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="follicleCount"
              name="follicleCount"
              label="Number of Follicles"
              type="number"
              value={follicleCount}
              onChange={handleFollicleCountChange}
              error={formik.touched.follicleCount && Boolean(formik.errors.follicleCount)}
              helperText={formik.touched.follicleCount && formik.errors.follicleCount}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle2" gutterBottom>
              Follicle Sizes (mm)
            </Typography>
            <Grid container spacing={2}>
              {Array.from({ length: follicleCount }).map((_, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <TextField
                    fullWidth
                    label={`Follicle ${index + 1} (mm)`}
                    type="number"
                    value={formik.values.follicleSize[index] || 0}
                    onChange={(e) => handleFollicleSizeChange(index, Number(e.target.value))}
                    InputProps={{ inputProps: { min: 0, max: 50 } }}
                  />
                </Grid>
              ))}
            </Grid>
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
              onBlur={formik.handleBlur}
              error={formik.touched.endometriumThickness && Boolean(formik.errors.endometriumThickness)}
              helperText={formik.touched.endometriumThickness && formik.errors.endometriumThickness}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="amhLevel"
              name="amhLevel"
              label="AMH Level (ng/mL, if known)"
              type="number"
              value={formik.values.amhLevel}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amhLevel && Boolean(formik.errors.amhLevel)}
              helperText={formik.touched.amhLevel && formik.errors.amhLevel}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>
              <Chip label="Medications" />
            </Divider>
          </Grid>

          {/* Medications */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="medications-label">Medications Used</InputLabel>
              <Select
                labelId="medications-label"
                id="medicationsUsed"
                name="medicationsUsed"
                multiple
                value={formik.values.medicationsUsed}
                onChange={handleMedicationChange}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {COMMON_MEDICATIONS.map((medication) => (
                  <MenuItem key={medication} value={medication}>
                    {medication}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }}>
              <Chip label="Medical History" />
            </Divider>
          </Grid>

          {/* Medical History */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="previousPregnancies"
              name="previousPregnancies"
              label="Previous Pregnancies"
              type="number"
              value={formik.values.previousPregnancies}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.previousPregnancies && Boolean(formik.errors.previousPregnancies)}
              helperText={formik.touched.previousPregnancies && formik.errors.previousPregnancies}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="previousMiscarriages"
              name="previousMiscarriages"
              label="Previous Miscarriages"
              type="number"
              value={formik.values.previousMiscarriages}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.previousMiscarriages && Boolean(formik.errors.previousMiscarriages)}
              helperText={formik.touched.previousMiscarriages && formik.errors.previousMiscarriages}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="previousIUIAttempts"
              name="previousIUIAttempts"
              label="Previous IUI Attempts"
              type="number"
              value={formik.values.previousIUIAttempts}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.previousIUIAttempts && Boolean(formik.errors.previousIUIAttempts)}
              helperText={formik.touched.previousIUIAttempts && formik.errors.previousIUIAttempts}
            />
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="notes"
              name="notes"
              label="Notes"
              multiline
              rows={4}
              value={formik.values.notes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.notes && Boolean(formik.errors.notes)}
              helperText={formik.touched.notes && formik.errors.notes}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary" size="large">
            {initialData.id ? 'Update IUI Data' : 'Save IUI Data'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default IUIDataForm; 