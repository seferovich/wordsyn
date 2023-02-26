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
  const [word, setWord] = useState('')
  const [syn, setSyn] = useState('')
  const [allWords, setAllWords] = useState([])
  
  const onWordChange = (e) => { 
    setWord(e.target.value) 
    console.log(word)
  }

  const onSynChange = (e) => { 
    setSyn(e.target.value) 
    console.log(syn)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    
    setAllWords([...allWords, syn])
    setSyn('')
    
  }
  console.log(allWords)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAllWords([...allWords, word])

    create([...allWords, word])
    setAllWords([])
    toast.success('Created')
  }


  return (
    
      <Container component="main" maxWidth="md">
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
              <Grid item xs={12} sm={5}>
                <TextField
                  onChange={onWordChange}
                  name="word"
                  value={word}
                  required
                  fullWidth
                  label="Word"
                  autoFocus
                />
              </Grid>
              <Grid item xs={9} sm={5}>
                <TextField
                  onChange={onSynChange}
                  value={syn}
                  required
                  fullWidth
                  label="Synonym"
                  name="syn"
                />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Button
                  onClick={handleAdd}
                  fullWidth
                  variant="contained"
                  sx={{mt: 1}}
                >
                  Add
                </Button>
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