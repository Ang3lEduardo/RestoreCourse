import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Box sx={{maxWidth:'xl', mx:'auto', px:4, position:'relative'}}>
      <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', position:'relative'}}>
        <img src="/images/hero1.jpg" alt="Restore" style={{position:'absolute', inset:0,
          width:'100%', height:'100%', objectFit:'cover', borderRadius:'16px', zIndex:0
        }}>

        </img>
        <Box sx={{display:'flex',
          flexDirection:'column',
          p:8,
          alignItems:'center',
          position:'relative',
          borderRadius:4
        }}>
          <Typography variant="h1" color="white" sx={{fontWeight:'bold',textAlign:'center', my:3}}>
            Welcome to Restore
          </Typography>
          <Button variant="contained" size="large" component={NavLink} to='/catalog'
            sx={{mt:8, 
              backgroundImage:'linear-gradient(to right, #2563eb, #06b6d4)',
              fontWeight:'bold',
              color:'white',
              borderRadius:'16px',
              px:8,
              py:2,
              border:'2px solid transparent',
            }}>
              Go to shop
            </Button>
        </Box>
      </Box>
    </Box>
  )
}