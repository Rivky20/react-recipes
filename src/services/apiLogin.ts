import axios from 'axios';
import { LoginResponse } from '../components/LoginUser';

const BASE_URL = 'http://localhost:3000/api';

export const apiLogin = {
    login: async (email: string, password: string) => {
        try {
            const response = await axios.post<LoginResponse>(`${BASE_URL}/user/login`, { email, password });
            return response.data;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred during login";
            alert(`Login Failed: ${errorMessage}`);
            throw new Error(errorMessage);
        }
    },

    register: async (userData: { email: string, password: string, firstName: string, lastName: string, address: string, phone: string }) => {
        try {
            const response = await axios.post(`${BASE_URL}/user/register`, userData);
            return response.data;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred during registration";
            alert(`Registration Failed: ${errorMessage}`);
            throw new Error(errorMessage);
        }
    },

    updateUser: async (userData: { firstName: string, lastName: string, email: string, address: string, phone: string }, userId: number) => {
        try {
            const response = await axios.put(`${BASE_URL}/user`, userData, { headers: { 'user-id': userId.toString() } });
            return response.data;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "An error occurred during update";
            alert(`Update Failed: ${errorMessage}`);
            throw new Error(errorMessage);
        }
    }
};
