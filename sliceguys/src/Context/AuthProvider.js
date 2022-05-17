import React, { createContext } from 'react';
import useCart from '../hooks/useCart';
import useData from '../hooks/useData';
import useStatus from '../hooks/useStatus';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const allAuth = useData();
    const allCart = useCart();
    const allstatus = useStatus();

    return (
        <AuthContext.Provider
            value={{ ...allAuth, ...allCart, ...allstatus }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;