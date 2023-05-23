import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isUser, setIsUser] = useState(false);
    const userInfo = useSelector((state) => state.data);
    console.log('userInfo', userInfo);

    useEffect(() => {
        const token = userInfo.accessToken;
        const name = userInfo.name;

        if (token && name) {
            setIsUser(true);
        }
    }, [userInfo]);

    const authContextValue = useMemo(
        () => ({
            isUser,
            setIsUser,
        }),
        [isUser, setIsUser]
    );

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
