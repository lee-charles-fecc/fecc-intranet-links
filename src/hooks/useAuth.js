// src/hooks/useAuth.js
import { useState, useEffect } from "react";

const AUTH_KEY = "intranet_auth";
const AUTH_EXPIRY_HOURS = 24;

const getStoredAuth = () => {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        if (!raw) return null;

        const { timestamp } = JSON.parse(raw);
        const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (ageHours > AUTH_EXPIRY_HOURS) {
            localStorage.removeItem(AUTH_KEY);
            return null;
        }
        return true;
    } catch (e) {
        localStorage.removeItem(AUTH_KEY);
        return null;
    }
};

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check session with backend on mount
    useEffect(() => {
        const init = async () => {
            try {
                // First, ask backend if session exists
                const res = await fetch("/api/me", {
                    credentials: "include", // include session cookie
                });

                if (res.ok) {
                    setIsAuthenticated(true);
                    // keep local flag fresh
                    localStorage.setItem(
                        AUTH_KEY,
                        JSON.stringify({ timestamp: Date.now() })
                    );
                } else {
                    // fallback to local cache (offline-ish behavior)
                    const cached = getStoredAuth();
                    setIsAuthenticated(!!cached);
                }
            } catch (err) {
                // Network error → rely on local cache if any
                const cached = getStoredAuth();
                setIsAuthenticated(!!cached);
            } finally {
                setIsLoading(false);
            }
        };

        init().then(r => {});
    }, []);

    const login = async (username, password) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // important for session cookie
            body: JSON.stringify({ username, password }),
        });

        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            throw new Error(data.message || "Invalid credentials");
        }

        localStorage.setItem(
            AUTH_KEY,
            JSON.stringify({ timestamp: Date.now() })
        );
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await fetch("/api/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (e) {
            // ignore network errors on logout
        }

        localStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
};
