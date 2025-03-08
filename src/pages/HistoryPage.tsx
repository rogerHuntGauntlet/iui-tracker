import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Card,
  CardContent,
  Grid,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  Assessment as AssessmentIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IUIAttempt } from '../types';
import PregnancyChanceResult from '../components/PregnancyChanceResult';
import { calculatePregnancyChances } from '../utils/pregnancyCalculator';

// Mock data - would normally come from a database
const mockAttempts: IUIAttempt[] = [
  {
    id: '1',
    date: '2023-10-15',
    age: 32,
    partnerSpermCount: 18,
    partnerSpermMotility: 45,
    follicleCount: 2,
    follicleSize: [19, 17],
    endometriumThickness: 8.5,
    medicationsUsed: ['Clomid (Clomiphene)', 'Ovidrel (trigger shot)'],
    previousPregnancies: 0,
    previousMiscarriages: 0,
    previousIUIAttempts: 0,
    bmi: 23.5,
    notes: 'First attempt',
    outcome: 'negative'
  },
  {
    id: '2',
    date: '2023-11-18',
    age: 32,
    partnerSpermCount: 20,
    partnerSpermMotility: 48,
    follicleCount: 3,
    follicleSize: [20, 18, 16],
    endometriumThickness: 9.2,
    medicationsUsed: ['Clomid (Clomiphene)', 'Ovidrel (trigger shot)'],
    previousPregnancies: 0,
    previousMiscarriages: 0,
    previousIUIAttempts: 1,
    bmi: 23.2,
    notes: 'Second attempt, increased medication dosage',
    outcome: 'unknown'
  }
];

const HistoryPage: React.FC = () => {
  const [attempts, setAttempts] = useState<IUIAttempt[]>(mockAttempts);
  const [selectedAttempt, setSelectedAttempt] = useState<IUIAttempt | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDialog = (attempt: IUIAttempt) => {
    setSelectedAttempt(attempt);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDeleteAttempt = (id: string) => {
    setAttempts(attempts.filter(attempt => attempt.id !== id));
  };

  const handleEditAttempt = (id: string) => {
    // In a real app, you would navigate to the edit page for this attempt
    console.log('Edit attempt:', id);
  };

  const getOutcomeChip = (outcome?: 'positive' | 'negative' | 'unknown') => {
    switch (outcome) {
      case 'positive':
        return <Chip label="Positive" color="success" size="small" />;
      case 'negative':
        return <Chip label="Negative" color="error" size="small" />;
      default:
        return <Chip label="Pending" color="warning" size="small" />;
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            IUI Attempts History
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track and analyze your IUI journey over time
          </Typography>
        </div>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/new-attempt')}
        >
          New Attempt
        </Button>
      </Box>
      
      {attempts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No IUI attempts recorded yet
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/new-attempt')}
            sx={{ mt: 2 }}
          >
            Record Your First Attempt
          </Button>
        </Paper>
      ) : isMobile ? (
        // Mobile view - cards
        <Box>
          {attempts.map((attempt) => (
            <Card key={attempt.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle1">
                    {new Date(attempt.date).toLocaleDateString()}
                  </Typography>
                  {getOutcomeChip(attempt.outcome)}
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <Grid container spacing={1} sx={{ mb: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Age:
                    </Typography>
                    <Typography variant="body1">
                      {attempt.age}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Follicles:
                    </Typography>
                    <Typography variant="body1">
                      {attempt.follicleCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Endometrium:
                    </Typography>
                    <Typography variant="body1">
                      {attempt.endometriumThickness} mm
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Attempt #:
                    </Typography>
                    <Typography variant="body1">
                      {attempt.previousIUIAttempts + 1}
                    </Typography>
                  </Grid>
                </Grid>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button 
                    size="small" 
                    startIcon={<AssessmentIcon />}
                    onClick={() => handleOpenDialog(attempt)}
                  >
                    Analysis
                  </Button>
                  <Box>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleEditAttempt(attempt.id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteAttempt(attempt.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        // Desktop view - table
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Follicles</TableCell>
                <TableCell>Endometrium</TableCell>
                <TableCell>Sperm Count</TableCell>
                <TableCell>Sperm Motility</TableCell>
                <TableCell>Outcome</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attempts.map((attempt) => (
                <TableRow key={attempt.id} hover>
                  <TableCell>
                    {new Date(attempt.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{attempt.age}</TableCell>
                  <TableCell>{attempt.follicleCount}</TableCell>
                  <TableCell>{attempt.endometriumThickness} mm</TableCell>
                  <TableCell>{attempt.partnerSpermCount} million/ml</TableCell>
                  <TableCell>{attempt.partnerSpermMotility}%</TableCell>
                  <TableCell>{getOutcomeChip(attempt.outcome)}</TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleOpenDialog(attempt)}
                    >
                      <AssessmentIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleEditAttempt(attempt.id)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeleteAttempt(attempt.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      
      {/* Pregnancy Chance Analysis Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          IUI Attempt Analysis
          <Typography variant="subtitle2" color="text.secondary">
            {selectedAttempt && new Date(selectedAttempt.date).toLocaleDateString()}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedAttempt && (
            <PregnancyChanceResult result={calculatePregnancyChances(selectedAttempt)} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HistoryPage; 