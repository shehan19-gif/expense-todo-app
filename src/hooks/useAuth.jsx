import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async() => {
        try {
            const response = await authAPI.verifyAuth();
            setUser(response.user);

        } catch(err) {
            setUser(null);

        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            setUser(response.user);
            return {success: true};

        } catch(error) {
            return {success: false, error: error.message};
        }
    };

    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            setUser(response.user);
            return {success: true};
        } catch(error) {
            return ({success: false, error: error.message});
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch(error) {
            console.error("Logout error: " + error);
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};