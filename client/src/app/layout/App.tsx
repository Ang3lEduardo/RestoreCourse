import { useEffect, useState } from "react"
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";



function App() {

  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const palletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: palletteType === 'light' ? '#eaeaea' : '#121212'
      },
    },
  });

  

  useEffect(() => {
    fetch('https://localhost:5001/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

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
                : 'radial-gradient(circle,#BAECF9,#F0F9FF)', 
                minHeight: '100vh',
                my:6 }}>
          <Container maxWidth="xl" sx={{ mt: 8 }}>
            <Catalog products={products} />
          </Container>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default App
