import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    login: (token: string) => void; 
    logout: () => void;
}

console.log("AuthContext");

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    console.log("AuthContext component");
    //define states
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");


    const login = (token: string) => {
        setIsLoggedIn(true);
        setToken(token);
        console.log("Login AuthContext method");
        console.log("authContext token:", token);
        sessionStorage.setItem('user_token', token); 
    };

    const logout = () => {
        setIsLoggedIn(false);
        sessionStorage.removeItem('user_token'); 
        sessionStorage.removeItem("user_id");
        sessionStorage.removeItem("user_email");
        sessionStorage.removeItem("user_firstname");
        setToken("");
        console.log("Logiut AuthContext method");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    console.log("useAuth AuthContext method");
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
