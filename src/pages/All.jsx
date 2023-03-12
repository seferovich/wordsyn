import React, { useEffect, useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit';
// import { create, getAll } from '../functions/functions'
import {toast} from 'react-toastify'
import { Chip } from '@mui/material'
import { Stack } from '@mui/system'
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
function All() {
  const [res, setRes] = useState()

  
  // useEffect(() => {
  //   const res1 = getAll()
  //   setRes(res1)
  // }, [])

 
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
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', }}>
        <AddIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create
      </Typography>
      <Box sx={{ mt: 3 }}>

        {res?.map((item, i) => (
          <Grid item xs={6} sm={5}>
            <Typography align="center" sx={{ mt: 2 }} variant="h4" >
              {item[0]}
            </Typography>

          
            <List>
              {item[1]?.map((item) => (
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >

                 
                  <ListItemText
                    primary={item} 
                  />
                </ListItem>
              ))}
                 
              
             </List>
            
          
          
          
          
        </Grid>
        ))}
        
          
        
      </Box>
    </Box>
       
    
  </Container>

   
  )
}

export default All