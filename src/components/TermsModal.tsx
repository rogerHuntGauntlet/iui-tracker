import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';

interface TermsModalProps {
  open: boolean;
  onAccept: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onAccept }) => {
  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
      onClose={() => {}}
    >
      <DialogTitle>Terms of Use & Medical Disclaimer</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Important Notice
          </Typography>
          <Typography variant="body1" paragraph>
            This calculator is for informational purposes only and should NOT be considered medical advice.
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          By using this calculator, you acknowledge and agree that:
        </Typography>
        
        <Box component="ul" sx={{ mb: 3 }}>
          <Typography component="li" variant="body1" paragraph>
            This tool provides statistical estimates only and should not be used as a substitute for professional medical advice.
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            No data is saved or stored - all calculations are performed locally in your browser.
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            The results are estimates based on available research and may not reflect your actual chances of success.
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            You should always consult with your healthcare provider about your specific situation and treatment options.
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          Privacy Notice
        </Typography>
        <Typography variant="body1" paragraph>
          This calculator runs entirely in your browser. We do not collect, store, or transmit any of your personal health information. All calculations are performed locally and are not saved anywhere.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={onAccept}
          color="primary"
          size="large"
        >
          I Understand and Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsModal; 