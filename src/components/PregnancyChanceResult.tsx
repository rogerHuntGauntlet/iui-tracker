import React, { useState } from 'react';
import OpenAI from 'openai';
import { 
  Typography, 
  Box, 
  Paper, 
  Alert, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@mui/material';
import { PregnancyChanceResult as PregnancyChanceResultType } from '../types';

interface Props {
  result: PregnancyChanceResultType;
}

const PregnancyChanceResult: React.FC<Props> = ({ result }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openAIKey, setOpenAIKey] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [llmInsights, setLlmInsights] = useState<string | null>(null);

  const handleGetMoreInsights = async () => {
    setIsLoading(true);
    try {
      const apiKey = openAIKey || process.env.REACT_APP_GAUNTLET_AI_KEY;
      if (!apiKey) {
        setOpenDialog(true);
        return;
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: Only because this is a personal tool
      });

      // Prepare the data for OpenAI
      const prompt = `Based on the following IUI attempt data:
        - Overall Success Rate: ${result.overallChance}%
        - Factors: ${Object.entries(result.factorBreakdown)
          .map(([_, details]) => details.description)
          .join(', ')}
        
        Please provide detailed insights and additional recommendations for improving success chances.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a fertility specialist AI assistant. Provide clear, compassionate, and actionable insights based on the provided IUI data. Focus on both medical and lifestyle factors that could improve success rates."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      setLlmInsights(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error getting insights:', error);
      setLlmInsights('Failed to get additional insights. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

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

      <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGetMoreInsights}
          disabled={isLoading}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Getting Insights...' : 'Get More AI Insights'}
        </Button>

        {llmInsights && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              AI Generated Insights:
            </Typography>
            <Typography variant="body2">
              {llmInsights}
            </Typography>
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Note: This analysis is based on statistical data and should not be considered medical advice.
          Always consult with your fertility specialist for personalized recommendations.
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>OpenAI API Key Required</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            To get AI-powered insights, you need to provide an OpenAI API key. You can either:
          </Typography>
          <Typography variant="body2" component="ul">
            <li>Use your own OpenAI API key</li>
            <li>Contact the administrator to get access to the GauntletAI API key</li>
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="OpenAI API Key"
            type="password"
            fullWidth
            variant="outlined"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => {
            setOpenDialog(false);
            if (openAIKey) {
              handleGetMoreInsights();
            }
          }} variant="contained">
            Save & Continue
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PregnancyChanceResult; 