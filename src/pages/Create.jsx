import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AddIcon from '@mui/icons-material/Add'
import { create } from '../functions/functions'
import {toast} from 'react-toastify'



export default function Create() {
  const [words, setWords] = useState({
    word: '',
    syn: ''
  })
  
  const onChange = (e) => {
    
    setWords({
      ...words,
      [e.target.name]: e.target.value
    })
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    create(words.word, words.syn)
    setWords({
      word: '',
      syn: ''
    })
    toast.success('Created')
  }


  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  name="word"
                  value={words.word}
                  required
                  fullWidth
                  label="Word"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={onChange}
                  value={words.syn}
                  required
                  fullWidth
                  label="Synonym"
                  name="syn"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
        
      </Container>
    
  )
}