import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { apiLogin } from "../services/apiLogin";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Stack } from "@mui/material";

type Mode = 'login' | 'register';
type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
};

const Login = () => {
    const { dispatch } = useUserContext();
    const [mode, setMode] = useState<Mode>('login');
    const [formData, setFormData] = useState<FormData>({
        email: "", password: "", firstName: "", lastName: "", address: "", phone: ""
    });
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            setError("Email and password are required");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = mode === 'register'
                ? await apiLogin.register(formData).then(() => apiLogin.login(formData.email, formData.password))
                : await apiLogin.login(formData.email, formData.password);

            if (response?.user) {
                dispatch({ type: "LOGIN", payload: response.user });
                setOpen(false);
            } else {
                setError("Invalid response from server");
            }
        } catch {
            setError("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    return (
        <>
            <Button 
                variant="outlined" 
                onClick={() => setOpen(true)} 
                sx={{ 
                    borderColor: '#FAD0C4', 
                    color: '#FAD0C4', 
                    '&:hover': { 
                        borderColor: '#FAD0C4', 
                        backgroundColor: '#FAD0C4', 
                        color: '#000' 
                    } 
                }}
            >
                {mode === 'login' ? 'Login' : 'Register'}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{mode === 'login' ? 'Login' : 'Register'}</DialogTitle>
                <DialogContent>
                    <Stack spacing={2}>
                        {mode === 'register' && ['firstName', 'lastName', 'address', 'phone'].map(field => (
                            <TextField
                                key={field}
                                name={field}
                                label={field.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                value={formData[field as keyof FormData]}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        ))}
                        {['email', 'password'].map(field => (
                            <TextField
                                key={field}
                                name={field}
                                label={field.charAt(0).toUpperCase() + field.slice(1)}
                                type={field}
                                value={formData[field as keyof FormData]}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        ))}
                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(""); }} sx={{ color: '#FAD0C4' }}>
                        Switch to {mode === 'login' ? 'Register' : 'Login'}
                    </Button>
                    <Button onClick={() => { setOpen(false); setError(""); }} sx={{ color: '#FAD0C4' }}>Cancel</Button>
                    <Button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        sx={{ 
                            backgroundColor: '#FAD0C4', 
                            color: '#000', 
                            '&:hover': { backgroundColor: '#FAD0C4' } 
                        }}
                    >
                        {loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Register')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Login;
