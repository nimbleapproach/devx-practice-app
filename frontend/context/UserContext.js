import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const login = (username, newToken) => {
        localStorage.setItem('username', username);
        localStorage.setItem('token', newToken);
        setUsername(username);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        setUsername(null);
        setToken(null);
    };

    return (
        <UserContext.Provider value={{ token, username, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;