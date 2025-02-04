export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    phone: string;
}

export interface UserState {
    user: User;
    isAuthenticated: boolean;
}

export interface UserAction {
    type: "LOGIN" | "REGISTER" | "UPDATE" | "LOGOUT";
    payload: User | null;
}

export const initialState: UserState = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        phone: "",
    },
    isAuthenticated: false
};

const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case "REGISTER":
        case "LOGIN":
            return {
                user: action.payload || initialState.user,
                isAuthenticated: !!action.payload
            };
        case "UPDATE":
            if (action.payload) {
                return {
                    ...state,
                    user: {
                        ...state.user,
                        ...action.payload,
                    },
                    isAuthenticated: true
                };
            }
            return state;
        case "LOGOUT":
            return initialState;
        default:
            return state;
    }
};

export default userReducer;