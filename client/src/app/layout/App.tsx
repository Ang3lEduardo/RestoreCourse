import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/store";



function App() {
  const {darkMode} = useAppSelector(state => state.ui)
  const palletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palletteType,
      background: {
        default: palletteType === 'light' ? '#91cae9' : '#213e5d'
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <ScrollRestoration />
        <CssBaseline />
        <NavBar />
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
