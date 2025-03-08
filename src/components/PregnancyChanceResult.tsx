import React from 'react';
import { 
  Typography, 
  Box, 
  Paper, 
  Alert, 
  List, 
  ListItem, 
  ListItemText,
  Divider
} from '@mui/material';
import { PregnancyChanceResult as PregnancyChanceResultType } from '../types';

interface Props {
  result: PregnancyChanceResultType;
}

const PregnancyChanceResult: React.FC<Props> = ({ result }) => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Success Probability Analysis
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" color="primary" align="center" gutterBottom>
          {result.overallChance}%
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" align="center">
          Estimated Success Rate
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Factor Breakdown
      </Typography>
      <List>
        {Object.entries(result.factorBreakdown).map(([factor, details]) => (
          <ListItem key={factor}>
            <ListItemText
              primary={details.description}
              secondary={`Impact: ${details.impact > 0 ? '+' : ''}${details.impact}`}
              sx={{
                '& .MuiListItemText-primary': {
                  color: details.impact > 0 ? 'success.main' : 
                         details.impact < 0 ? 'error.main' : 
                         'text.primary'
                }
              }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Recommendations
      </Typography>
      {result.recommendations.map((recommendation, index) => (
        <Alert severity="info" sx={{ mb: 1 }} key={index}>
          {recommendation}
        </Alert>
      ))}

      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Note: This analysis is based on statistical data and should not be considered medical advice.
        Always consult with your fertility specialist for personalized recommendations.
      </Typography>
    </Paper>
  );
};

export default PregnancyChanceResult; 