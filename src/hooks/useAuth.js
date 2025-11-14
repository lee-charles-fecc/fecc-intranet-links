import { useState, useEffect } from 'react';

const AUTH_KEY = 'intranet_auth';
const AUTH_EXPIRY_HOURS = 24;

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        try {
            const authData = localStorage.getItem(AUTH_KEY);

            if (!authData) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            const { timestamp } = JSON.parse(authData);
            const now = new Date().getTime();
            const hoursSinceLogin = (now - timestamp) / (1000 * 60 * 60);

            if (hoursSinceLogin >= AUTH_EXPIRY_HOURS) {
                // Session expired
                logout();
            } else {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            logout();
        } finally {
            setIsLoading(false);
        }
    };

    const login = () => {
        const authData = {
            timestamp: new Date().getTime(),
            authenticated: true
        };

        localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout
    };
};