export interface LoginResponse {
    user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        password: string
        address: string
        phone: string
    };
    token: string;
}
