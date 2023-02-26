import React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { Paper } from '@mui/material'
import { Link } from 'react-router-dom'


export default function Nav() {
  const [value, setValue] = React.useState(1)

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={value}
        >
          <Link to='/wordsyn/search'><BottomNavigationAction label="Search" icon={<SearchIcon color='secondary.main'/>} ></BottomNavigationAction></Link>
          <Link to='/wordsyn/'><BottomNavigationAction label="Create" icon={<AddIcon color='secondary.main' />} /></Link>
        </BottomNavigation>
      </Paper>
    
  )
}
