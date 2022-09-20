import React, { createContext, useEffect, useContext } from "react";

import { verifyToken } from "./requests";
import { useData } from "./hooks";
import router from "next/router";

const initialValue = { status: 100, user: null };

const LoginContext = createContext(initialValue);

export function LoginProvider({ children }) {
    const [state, setState] = useData(initialValue);

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");

        async function verifyAccessToken() {
            const response = await verifyToken(access_token);
            setState({
                status: response.status,
                user: JSON.parse(localStorage.getItem("user")),
            });
            if (response.status != 200) {
                router.push('/login')
            } else if (response.status == 200 && router.route == '/login') {
                router.push('/')
            }
        }
        verifyAccessToken();
    }, [setState]);

    return (
        <LoginContext.Provider
            value={{ loginState: state, setLoginState: setState }}
        >
            {children}
        </LoginContext.Provider>
    );
}

export function useLoginContext() {
    return useContext(LoginContext);
}
