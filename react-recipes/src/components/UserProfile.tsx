import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Avatar } from "@mui/material";
import UpdateUserForm from "./UpdateUserForm";

function stringToColor(string: string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

const UserProfile = () => {
    const { state: { user } } = useUserContext();
    const [isEditOpen, setIsEditOpen] = useState(false);

    const initial = user.email[0]?.toUpperCase() || '?';

    return (
        <>
            <Avatar
                sx={{
                    bgcolor: stringToColor(user.email),
                    width: 50,
                    height: 50,
                    cursor: 'pointer'
                }}
                onClick={() => setIsEditOpen(true)}
            >
                {initial}
            </Avatar>
            
            <UpdateUserForm isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
        </>
    );
};

export default UserProfile;