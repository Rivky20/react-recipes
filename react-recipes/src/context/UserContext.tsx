import { createContext, ReactNode, useContext, useReducer } from "react";
import userReducer, { initialState, UserState, UserAction } from "../reducer/UserReducer";

const UserContext = createContext<{
    state: UserState;
    dispatch: React.Dispatch<UserAction>;
} | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext value={{ state, dispatch }}>
            {children}
        </UserContext>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

export { UserProvider, useUserContext };