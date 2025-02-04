import { Typography, Box, Paper } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';

const Home = () => {
  return (
    <Paper elevation={3} sx={{ p: 17, borderRadius: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <HomeIcon sx={{ fontSize: 200, color: 'primary.FAD0C4' }} />
        <Typography variant="h2">Welcome to Food Professionals</Typography>
      </Box>
    </Paper>
  );
};

export default Home;
