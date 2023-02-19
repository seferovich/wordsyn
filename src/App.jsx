import { Route, Routes } from "react-router-dom";
import { BottomNavigation, createTheme } from "@mui/material";
import Nav from "./components/Nav";
import Create from "./pages/Create";
import Search from "./pages/Search";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme({
  palette:{
    primary:{
      main: '#2E5266'
    },
    secondary:{
      main: '#6E8898'
    }

  }
})
export default function App() {


  return (
    <div>
      <ThemeProvider theme={theme}>
        <Nav />
        <Routes>
          <Route path='/create' element={<Create />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </ThemeProvider>
    </div>

  )
}