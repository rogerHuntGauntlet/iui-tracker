import React from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  Chip,
  LinearProgress,
  Grid,
  alpha
} from '@mui/material';
import { PregnancyChanceResult as PregnancyChanceResultType } from '../types';

interface ResultProps {
  result: PregnancyChanceResultType;
}

const getImpactColor = (impact: number): string => {
  if (impact >= 1) return '#4caf50'; // Positive
  if (impact > 0) return '#8bc34a';  // Slightly positive
  if (impact === 0) return '#9e9e9e'; // Neutral
  if (impact > -1) return '#ff9800'; // Slightly negative
  return '#f44336'; // Negative
};

const getChipLabel = (impact: number): string => {
  if (impact >= 1) return 'Positive';
  if (impact > 0) return 'Slightly Positive';
  if (impact === 0) return 'Neutral';
  if (impact > -1) return 'Slightly Negative';
  return 'Negative';
};

const PregnancyChanceResult: React.FC<ResultProps> = ({ result }) => {
  const { overallChance, factorBreakdown, recommendations } = result;
  
  // Determine the color based on the overall chance
  const getOverallChanceColor = () => {
    if (overallChance >= 25) return '#4caf50'; // Good chance
    if (overallChance >= 15) return '#8bc34a'; // Moderate chance
    if (overallChance >= 10) return '#ffc107'; // Average chance
    return '#ff9800'; // Below average chance
  };
  
  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Pregnancy Chance Analysis
      </Typography>
      
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="div" sx={{ color: getOverallChanceColor(), mb: 1 }}>
          {overallChance}%
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Estimated Chance of Pregnancy
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={overallChance} 
          sx={{ 
            mt: 2, 
            height: 10, 
            borderRadius: 5,
            backgroundColor: alpha(getOverallChanceColor(), 0.2),
            '& .MuiLinearProgress-bar': {
              backgroundColor: getOverallChanceColor(),
            }
          }} 
        />
      </Box>
      
      <Divider sx={{ my: 3 }}>
        <Chip label="Contributing Factors" />
      </Divider>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.entries(factorBreakdown).map(([key, { impact, description }]) => (
          <Grid item xs={12} sm={6} md={4} key={key}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2, 
                height: '100%',
                borderLeft: `4px solid ${getImpactColor(impact)}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Chip 
                  label={getChipLabel(impact)} 
                  size="small" 
                  sx={{ 
                    bgcolor: alpha(getImpactColor(impact), 0.1),
                    color: getImpactColor(impact),
                    fontWeight: 'bold'
                  }} 
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Divider sx={{ my: 3 }}>
        <Chip label="Recommendations" />
      </Divider>
      
      <List>
        {recommendations.map((recommendation, index) => (
          <ListItem key={index} sx={{ py: 1 }}>
            <ListItemText primary={recommendation} />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          <strong>Disclaimer:</strong> These estimates are based on general statistics and your specific factors.
          Individual results may vary. Always consult with your fertility specialist for medical advice.
        </Typography>
      </Box>
    </Paper>
  );
};

export default PregnancyChanceResult; 