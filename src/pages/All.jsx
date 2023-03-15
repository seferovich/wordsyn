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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { changeWord, getAll, remove } from '../functions/functions'
import CheckIcon from '@mui/icons-material/Check'
import {toast} from 'react-toastify'
import {Divider } from '@mui/material'
import { Stack } from '@mui/system'
import Popover from '@mui/material/Popover'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import validator from 'validator'
import InputAdornment from '@mui/material/InputAdornment'

function All() {
  const [res, setRes] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [editVal, setEditVal] = useState('')
  const [currName, setCurrName] = useState('')

  const open = Boolean(anchorEl)
  
  

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
    setCurrName(e.target.name)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onEditChange = (e) => {
    setEditVal(e.target.value)
  }

  const handleDelete = () => {
    remove(currName)
    handleClose()
    toast.success('Deleted')
  }

  const handleEdit = () => {
    if(!validator.isEmpty(editVal, { ignore_whitespace: true })){
      changeWord(currName, editVal)
      handleClose()
      toast.success('Succesfully edited')
    }else{
      toast.error("Input can't be empty")
    }
    
  }
  

  useEffect(() => {
    const res1 = getAll()
    setRes(res1)
  }, [remove, handleDelete, handleEdit, changeWord])

  return (

    <Container component="main" maxWidth="md">
    <CssBaseline />
    
    <Box
      sx={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'primary.main', }}>
        <MoreHorizIcon />
      </Avatar>
      <Typography  variant="h4">
        All words
      </Typography>
      <Box sx={{ mt: 1, mb: 10 }}>

        {res?.map((item, i) => (
          <Grid item xs={6} sm={5}>
            <List >
              {item?.map((item) => (
                <ListItem
                  secondaryAction={
                    <IconButton onClick={handleOpen} name={item} edge="end" aria-label="delete">
                      <EditIcon name={item} sx={{zIndex: -99}} />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item} 
                    primaryTypographyProps={{fontSize: '18px'}} 
                  />
                </ListItem>
              ))}           
            </List>
            <Divider />
        </Grid>
        
        ))}
      </Box>
    </Box>
    
       
    <Popover
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
          onChange={onEditChange}
          label='Edit or delete the word'
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={handleEdit} position="end">
                <IconButton>
                  <CheckIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={handleDelete}  type="button">
          <DeleteIcon color='primary'/>
        </IconButton>
      </Stack> 
    </Popover>  
  </Container>

   
  )
}

export default All