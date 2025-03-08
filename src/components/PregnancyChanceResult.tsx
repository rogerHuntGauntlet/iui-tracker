import React, { useState, useEffect } from 'react';
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
  CircularProgress,
  Link
} from '@mui/material';
import { PregnancyChanceResult as PregnancyChanceResultType } from '../types';

interface Props {
  result: PregnancyChanceResultType;
}

const formatAIResponse = (response: string) => {
  // Split the response into sections based on numbered points
  const sections = response.split(/(?=\d+\.)/g);
  
  // Process each section to extract the topic and content
  return sections.filter(section => section.trim().length > 0).map(section => {
    const match = section.match(/\d+\.\s*([^:]+):\s*([\s\S]*)/);
    if (match) {
      return {
        number: section.match(/\d+/)?.[0] || '',
        topic: match[1].trim(),
        content: match[2].trim()
      };
    }
    return {
      number: '',
      topic: '',
      content: section.trim()
    };
  });
};

const PregnancyChanceResult: React.FC<Props> = ({ result }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [openAIKey, setOpenAIKey] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [llmInsights, setLlmInsights] = useState<string | null>(null);
  const [lastAnalysisTime, setLastAnalysisTime] = useState<number>(0);
  const [timeUntilNextAnalysis, setTimeUntilNextAnalysis] = useState<number>(0);

  useEffect(() => {
    // Update countdown timer if needed
    if (timeUntilNextAnalysis > 0) {
      const timer = setInterval(() => {
        const remaining = Math.max(0, 60 - Math.floor((Date.now() - lastAnalysisTime) / 1000));
        setTimeUntilNextAnalysis(remaining);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeUntilNextAnalysis, lastAnalysisTime]);

  const handleGetMoreInsights = async () => {
    const now = Date.now();
    const timeSinceLastAnalysis = now - lastAnalysisTime;
    
    if (timeSinceLastAnalysis < 60000) { // 1 minute in milliseconds
      const remainingSeconds = Math.ceil((60000 - timeSinceLastAnalysis) / 1000);
      setTimeUntilNextAnalysis(remainingSeconds);
      return;
    }

    setIsLoading(true);
    try {
      const apiKey = openAIKey || process.env.REACT_APP_GAUNTLET_AI_KEY;
      if (!apiKey) {
        setOpenDialog(true);
        return;
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
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

      setLastAnalysisTime(now);
      setTimeUntilNextAnalysis(0);
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
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGetMoreInsights}
            disabled={isLoading || timeUntilNextAnalysis > 0}
            startIcon={isLoading ? <CircularProgress size={20} /> : null}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            {isLoading ? 'Analyzing Data...' : 
             timeUntilNextAnalysis > 0 ? `Wait ${timeUntilNextAnalysis}s` :
             '🔍 Get Advanced AI Analysis'}
          </Button>
          <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
            Using <Link href="https://www.gauntletai.com/" target="_blank" rel="noopener noreferrer">GauntletAI's</Link> API key. <Button 
              variant="text" 
              size="small" 
              onClick={() => setOpenDialog(true)}
              sx={{ textTransform: 'none', p: 0, minWidth: 0, verticalAlign: 'baseline' }}
            >
              Use your own key instead
            </Button>
          </Typography>
        </Box>

        {llmInsights && (
          <Box sx={{ mt: 3, bgcolor: '#f8f9fa', p: 3, borderRadius: 2, border: '1px solid #e9ecef' }}>
            <Typography variant="h6" gutterBottom sx={{ 
              color: '#2c3e50', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              borderBottom: '2px solid #4CAF50',
              pb: 1
            }}>
              <Box component="span" sx={{ fontSize: '1.5rem' }}>🤖</Box>
              Advanced AI Analysis
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              {formatAIResponse(llmInsights).map((section, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    mb: 2.5,
                    p: 2.5,
                    bgcolor: 'white',
                    borderRadius: 1,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    border: '1px solid #edf2f7',
                    '&:hover': {
                      boxShadow: '0 4px 6px rgba(0,0,0,0.07)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {section.number && (
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'primary.main',
                          minWidth: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          bgcolor: 'primary.light',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {section.number}
                      </Typography>
                    )}
                    <Box sx={{ flex: 1 }}>
                      {section.topic && (
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 'bold',
                            mb: 0.5
                          }}
                        >
                          {section.topic}
                        </Typography>
                      )}
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#2c3e50',
                          lineHeight: 1.7,
                          letterSpacing: '0.01em'
                        }}
                      >
                        {section.content}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Typography 
              variant="caption" 
              sx={{ 
                display: 'block', 
                mt: 2, 
                color: '#666',
                fontStyle: 'italic',
                textAlign: 'center',
                borderTop: '1px solid #e9ecef',
                pt: 2
              }}
            >
              AI-generated insights based on your specific data. For informational purposes only.
            </Typography>
          </Box>
        )}

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Note: This analysis is based on statistical data and should not be considered medical advice.
          Always consult with your fertility specialist for personalized recommendations.
        </Typography>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>OpenAI API Key Configuration</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            You're currently using <Link href="https://www.gauntletai.com/" target="_blank" rel="noopener noreferrer">GauntletAI's</Link> OpenAI API key. You can:
          </Typography>
          <List>
            <ListItem>
              <ListItemText 
                primary="Continue using GauntletAI's key" 
                secondary="Limited to one analysis per minute"
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Use your own OpenAI API key" 
                secondary="Get your key at platform.openai.com"
              />
            </ListItem>
          </List>
          <TextField
            autoFocus
            margin="dense"
            label="Your OpenAI API Key (optional)"
            type="password"
            fullWidth
            variant="outlined"
            value={openAIKey}
            onChange={(e) => setOpenAIKey(e.target.value)}
            sx={{ mt: 2 }}
            helperText="Your key will only be stored in your browser's memory"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              if (openAIKey) {
                handleGetMoreInsights();
              }
            }} 
            variant="contained"
          >
            {openAIKey ? 'Save & Analyze' : 'Use GauntletAI Key'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default PregnancyChanceResult; 