import { useState, useMemo } from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import NotesWall from './components/NotesWall';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1976d2',
          },
          background: {
            default: mode === 'light' ? '#f5f5f5' : '#121212',
            paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: 'Arial, sans-serif',
          h1: {
            fontSize: '1.8rem',
            fontWeight: 'bold',
          },
        },
      }),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: 'background.default',
        py: 2
      }}>
        <Container maxWidth="md">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
            mb: 2 
          }}>
            <Typography 
              variant="h1" 
              sx={{ 
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '1.8rem' },
                textAlign: 'center'
              }}
            >
              Mini Twitter
            </Typography>
            <IconButton 
              onClick={toggleColorMode} 
              color="inherit"
              sx={{ 
                position: 'absolute',
                right: 0,
                p: 1
              }}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
          <NotesWall />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;