import { useState } from "react"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";



function App() {

  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: palletteType === 'light' ? '#d0e3e7' : '#213e5d'
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Box sx={{ backgroundColor: darkMode 
                ? 'radial-gradient(circle,#1e3aBa,#111B27)'
                : 'radial-gradient(circle,#baecf9,#f0f9ff)', 
                minHeight: '100vh',
                py:6 }}>
          <Container maxWidth="xl" sx={{ mt: 8 }}>
            <Outlet />
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
