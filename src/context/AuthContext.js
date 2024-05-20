import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

    useEffect(() => {
    const token = getAuthToken();
    if (token) {
        const decoded = jwtDecode(token); // Use the correctly imported jwtDecode
        setAuth({ isAuthenticated: true, user: decoded });
    }
    }, []);

    return (
    <AuthContext.Provider value={{auth, setAuth }}>
        {children}
    </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);