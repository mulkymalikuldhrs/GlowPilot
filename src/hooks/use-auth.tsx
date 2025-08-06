
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Simulate a logged-out state since we're disabling login for now
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false); // Set loading to false immediately

    const signInWithGoogle = async () => {
        console.log("Sign-in is currently disabled.");
        // In a real scenario, this would interact with Firebase
        alert("Login functionality is temporarily disabled.");
    };

    const logout = async () => {
        console.log("Logout is currently disabled.");
        alert("Logout functionality is temporarily disabled.");
    };

    const value = { user, loading, signInWithGoogle, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
