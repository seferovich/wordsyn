import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { search } from '../functions/functions'
import { List, ListItem, ListItemText } from '@mui/material'
import {toast} from 'react-toastify'
import validator from 'validator'


export default function Search() {

  const [val, setVal] = useState('')
  const [res, setRes] = useState([])
  
  const handleChange = (e) => {
    setVal(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!validator.isEmpty(val, { ignore_whitespace: true })){
      let tempRes = search(val)

      if(!tempRes){
        return toast.warn('Word not found')
      }

      tempRes = tempRes.filter(item => item !== val)
      setRes(tempRes)
      
    }else{
      toast.error('Please input a valid word')
    }

  }
  console.log(res)



  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <SearchIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Search
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              onChange={handleChange}
              value={val}
              fullWidth
              label="Search a word"
              name="search"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Search
            </Button>
          </Box>
          
          <Typography component="h1" variant="h5">
            Synonyms:
          </Typography>
          <List mb={10}>
            {res ? res.map((val, i) => (
              <ListItem key={i}>
                <ListItemText primaryTypographyProps={{fontSize: '18px'}} key={i}>{val}</ListItemText>
              </ListItem>
            )): ''}
          </List>
        </Box>
        
      </Container>
  )
}