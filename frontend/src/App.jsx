import { Container, CssBaseline, ThemeProvider, createTheme, Box, Typography } from '@mui/material';
import NotesWall from './components/NotesWall';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1a73e8',
    },
    secondary: {
      main: '#d93025',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        py: 3
      }}>
        <Container maxWidth="md">
          <Typography 
            variant="h1" 
            align="center" 
            sx={{ mb: 3 }}
          >
            Mini Twitter
          </Typography>
          <NotesWall />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;