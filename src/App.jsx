import { Route, Routes } from "react-router-dom";
import { createTheme } from "@mui/material";
import Nav from "./components/Nav";
import Create from "./pages/Create";
import Search from "./pages/Search";
import { ThemeProvider } from "@emotion/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import All from "./pages/All";

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
          <Route path='/wordsyn/' element={<Create />} />
          <Route path='/wordsyn/search' element={<Search />} />
          <Route path='/wordsyn/all' element={<All />} />
        </Routes>
      </ThemeProvider>
      <ToastContainer />
    </div>

  )
}