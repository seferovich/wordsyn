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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
import { create } from '../functions/functions'
import {toast} from 'react-toastify'
import { Chip } from '@mui/material'
import { Stack } from '@mui/system'
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';



export default function Create() {
  const [word, setWord] = useState('')
  const [syn, setSyn] = useState('')
  const [allWords, setAllWords] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [currId, setCurrId] = useState()
  const [isError, setIsError] = useState(false)
  const open = Boolean(anchorEl)
  
  const onWordChange = (e) => { 
    setWord(e.target.value) 
    // console.log(word)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    // I had to do this because it isn't a good idea to mutate the state directly
    let allWordsCopy = [...allWords]
    allWordsCopy.splice(currId, 1)
    setAllWords(allWordsCopy)
    handleClose()
    console.log(allWords, e.currentTarget.id)
  }

  const onEditChange = (e) => {
    // I had to do this because it isn't a good idea to mutate the state directly
    let newVal =  e.currentTarget.value
    let allWordsCopy = [...allWords]
    allWordsCopy[currId] = newVal
    
    setAllWords(allWordsCopy)
  }

  

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
    setCurrId(e.currentTarget.id)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }


  const onSynChange = (e) => { 
    setSyn(e.target.value) 
  }

  const handleAdd = (e) => {
    e.preventDefault()
    if(syn !== '' && word !== '' && !(allWords.includes(syn))){
      setAllWords([...allWords, syn])
      setIsError(false)
    }else if(allWords.includes(syn)){
      setIsError(true)
      toast.error("You've already added this word")
    }else if(syn == '' || word == ''){
      setIsError(true)
      toast.error(`You need to add a ${word === '' ? 'word' : 'synonym'}`)
    }
      
    setSyn('')
    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAllWords([...allWords, word])

    create([...allWords, word])
    
    setAllWords([])
    setWord('')
    toast.success('Created')
  }
  console.log(allWords)
  
  return (
    
      <Container component="main" maxWidth="sm">
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
          <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  onChange={onWordChange}
                  name="word"
                  value={word}
                  required
                  fullWidth
                  label="Word"
                  autoFocus
                  error={isError}
                />
              </Grid>
              <Grid item xs={9} md={5}>
                <TextField
                  onChange={onSynChange}
                  value={syn}
                  required
                  fullWidth
                  label="Synonym"
                  name="syn"
                  error={isError}
                />
              </Grid>
              <Grid item xs={3} md={2}>
                <Button
                  onClick={handleAdd}
                  fullWidth
                  variant="contained"
                  sx={{mt: 1}}
                >
                  Add
                </Button>
              </Grid>
              
            <Grid item xs={3} md={12}>
           
              </Grid>
              
              
              
              
              
            </Grid>

            <Box maxWidth='sm'>
              {allWords.length > 0 ? allWords.map((val, i) => (
                <Chip
                  label={val}
                  variant='outlined'
                  sx={{zIndex: 2, margin: '2px'}}
                  deleteIcon={<EditIcon id={i}/>}
                  key={i}
                  id={i}
                  onDelete={handleOpen}
                />
              )) : ''}
          
            </Box>
            
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>

        
        <Popover
          // id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
        >

          
          <Stack direction='row'>
            <TextField
              sx={{ m: 1.2, flex: 1 }}
              value={allWords[currId]}
              onChange={onEditChange}
              label='Edit or delete the synoynm'
            />
            <IconButton onClick={handleDelete} type="button">
            
              <DeleteIcon color='primary'/>
            </IconButton>
          </Stack>
            
            
        </Popover>  
        
      </Container>
    
  )
}