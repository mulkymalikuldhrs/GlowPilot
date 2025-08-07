
'use client';

import { auth } from '@/lib/firebase/client';
import type { User } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';

type UserContextType = {
    user: User | null;
    isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            (user) => {
                setUser(user);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        isLoading,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
