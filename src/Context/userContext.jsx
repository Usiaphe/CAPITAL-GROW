import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// create context
export const UserContext = createContext({});

// context provider
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // if user is not loaded, get profile
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
            });
        }
    }, [user]); // dependency added

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}