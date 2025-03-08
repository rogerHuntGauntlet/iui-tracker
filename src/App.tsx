import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { purple, pink } from '@mui/material/colors';

// Components
import Layout from './components/Layout';
import IUICalculator from './components/IUICalculator';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: pink[400],
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
        containedPrimary: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});

// About page
const AboutPage = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
    <h2>About IUI Success Calculator</h2>
    <p>
      IUI Success Calculator is an open-source, privacy-focused tool that helps estimate pregnancy chances for 
      intrauterine insemination (IUI) procedures based on your specific circumstances.
    </p>
    <p>
      This application uses statistical models based on medical research to provide instant 
      estimates of pregnancy chances. The calculations take into account various factors 
      known to influence IUI success rates, including age, sperm parameters, follicle development, and more.
    </p>
    <p>
      <strong>Privacy First:</strong> This calculator runs entirely in your browser. 
      We don't store any data, require no login, and have no tracking - ensuring complete privacy 
      for your sensitive medical information.
    </p>
    <p>
      <strong>Open Source:</strong> We believe in the power of community collaboration to improve 
      fertility treatment outcomes. This project is open-source, and we welcome contributions from:
    </p>
    <ul>
      <li>Medical professionals who can help refine our success rate calculations</li>
      <li>Developers who can improve the codebase and add new features</li>
      <li>Individuals with IUI experience who can provide valuable insights</li>
      <li>Anyone interested in making fertility treatment information more accessible</li>
    </ul>
    <p>
      Visit our <a href="https://github.com/yourusername/iui-tracker" target="_blank" rel="noopener noreferrer">
      GitHub repository</a> to learn how you can contribute to this project.
    </p>
    <p>
      <strong>Medical Disclaimer:</strong> This application provides estimates based on statistical data and 
      should not be considered a substitute for professional medical advice. The actual success rates may vary 
      based on individual circumstances. Always consult with your fertility specialist for personalized 
      treatment recommendations.
    </p>
  </div>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IUICalculator />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
