
'use client';

import { auth } from '@/lib/firebase/client';
import type { User } from 'firebase/auth';
import { createContext, useContext, useState, useEffect } from 'react';

type UserContextType = {
    user: User | null;
    isNewUser: boolean;
    isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            (userAuth) => {
                setUser(userAuth);
                if (userAuth && userAuth.metadata) {
                    const { creationTime, lastSignInTime } = userAuth.metadata;
                    // Check if the account was created recently (within the last ~10 seconds)
                    // This is a simple heuristic to determine if it's the very first sign-in.
                    if (creationTime && lastSignInTime) {
                        const creation = new Date(creationTime).getTime();
                        const lastSignIn = new Date(lastSignInTime).getTime();
                        if (lastSignIn - creation < 10000) {
                            setIsNewUser(true);
                        } else {
                            setIsNewUser(false);
                        }
                    } else {
                        setIsNewUser(false);
                    }
                } else {
                    setIsNewUser(false);
                }
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        isNewUser,
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
