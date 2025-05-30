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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      await axios.patch(`${API_URL}/notes/${id}/like`);
      fetchNotes();
    } catch (error) {
      console.error('Error liking note:', error);
    }
  };

  const handleUnlike = async (id) => {
    try {
      await axios.patch(`${API_URL}/notes/${id}/unlike`);
      fetchNotes();
    } catch (error) {
      console.error('Error unliking note:', error);
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
      <Card sx={{ mb: 3, backgroundColor: '#fff' }}>
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
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
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
            <Card sx={{ backgroundColor: '#fff' }}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {note.content}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  By {note.author} • {new Date(note.createdAt).toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    onClick={() => handleLike(note._id)}
                    color="primary"
                    size="small"
                  >
                    <ThumbUpOutlined />
                  </IconButton>
                  <Typography variant="body2">
                    {note.likes ?? 0}
                  </Typography>
                  <IconButton
                    onClick={() => handleUnlike(note._id)}
                    color="secondary"
                    size="small"
                  >
                    <ThumbUp />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(note._id)}
                    color="error"
                    size="small"
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
        />
      </Box>
    </Box>
  );
};

export default NotesWall; 