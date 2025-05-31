import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Pagination,
} from '@mui/material';
import { ThumbUp, ThumbUpOutlined, Delete } from '@mui/icons-material';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const NotesWall = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ content: '', author: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${API_URL}/notes?page=${page}`);
      setNotes(response.data.notes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/notes`, newNote);
      setNewNote({ content: '', author: '' });
      fetchNotes();
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/notes/${id}/like`);
      setNotes(prevNotes => 
        prevNotes.map(note => {
          if (note._id === id) {
            // Toggle between 1 and 0
            return {
              ...note,
              likes: note.likes === 1 ? 0 : 1
            };
          }
          return note;
        })
      );
    } catch (error) {
      console.error('Error liking note:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <Box>
      <Card sx={{ 
        mb: 3, 
        backgroundColor: 'background.paper',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        color: 'text.primary'
      }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={newNote.author}
                  onChange={(e) => setNewNote({ ...newNote, author: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'text.primary',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Write your note"
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  required
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'text.secondary',
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'text.primary',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  size="medium"
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 'medium',
                  }}
                >
                  Post Note
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} key={note._id}>
            <Card sx={{ 
              backgroundColor: 'background.paper',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease-in-out',
              color: 'text.primary',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}>
              <CardContent>
                <Typography 
                  variant="body1" 
                  gutterBottom
                  sx={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    mb: 2,
                    color: 'text.primary'
                  }}
                >
                  {note.content}
                </Typography>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary" 
                  sx={{ 
                    display: 'block',
                    mb: 2,
                    fontSize: '0.8rem'
                  }}
                >
                  By {note.author} • {new Date(note.createdAt).toLocaleString()}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  pt: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <IconButton
                      onClick={() => handleLike(note._id)}
                      color={note.likes === 1 ? "primary" : "default"}
                      size="small"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                        }
                      }}
                    >
                      {note.likes === 1 ? <ThumbUp /> : <ThumbUpOutlined />}
                    </IconButton>
                    <Typography 
                      variant="body2" 
                      color={note.likes === 1 ? "primary.main" : "text.secondary"}
                      sx={{ 
                        fontWeight: note.likes === 1 ? 'bold' : 'normal',
                        minWidth: '1.5rem',
                        textAlign: 'center'
                      }}
                    >
                      {note.likes || 0}
                    </Typography>
                  </Box>

                  <IconButton
                    onClick={() => handleDelete(note._id)}
                    color="error"
                    size="small"
                    sx={{ 
                      ml: 'auto',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                      }
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
          size="medium"
        />
      </Box>
    </Box>
  );
};

export default NotesWall; 