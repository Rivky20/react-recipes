import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Box, List, ListItem, ListItemButton, ListItemText, Container, Button, Typography } from '@mui/material';
import { Home as HomeIcon, Info as InfoIcon, Style as SchoolIcon } from '@mui/icons-material';
import { useUserContext } from '../../context/UserContext';
import Login from '../Login';
import UserProfile from '../UserProfile';
import AddRecipe from '../../pages/AddRecipe';

const AppLayout = () => {
    const navigate = useNavigate();
    const { state: { isAuthenticated }, dispatch } = useUserContext();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT", payload: null });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="sticky" color="default">
                <Container maxWidth="lg">
                    <Toolbar sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        width: '100%',
                        px: { xs: 1, sm: 2 } 
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {!isAuthenticated ? (
                                <Login />
                            ) : (
                                <>
                                    <UserProfile />
                                    <Button 
                                        variant="outlined" 
                                        color="secondary"
                                        size="small"
                                        onClick={handleLogout}
                                        sx={{ ml: 2 }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </Box>

                        <List sx={{
                            display: 'flex',
                            p: 0,
                            m: 0
                        }}>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/')} sx={{ px: 2 }}>
                                    <HomeIcon sx={{ mr: 1 }} />
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/about')} sx={{ px: 2 }}>
                                    <InfoIcon sx={{ mr: 1 }} />
                                    <ListItemText primary="About" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate('/recipes')} sx={{ px: 2 }}>
                                    <SchoolIcon sx={{ mr: 1 }} />
                                    <ListItemText primary="Recipes" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <AddRecipe />
                    </Toolbar>
                </Container>
            </AppBar>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: 'background.default'
                }}
            >
                <Container maxWidth="lg">
                    <Outlet />
                </Container>
            </Box>

            <Box sx={{
                backgroundColor: '#FAD0C4', 
                textAlign: 'center',
                py: 1,
                mt: 'auto',
            }}>
                <Typography variant="body2" color="text.secondary">
                    All rights reserved @ RIVKY 2025
                </Typography>
            </Box>
        </Box>
    );
};
export default AppLayout;
