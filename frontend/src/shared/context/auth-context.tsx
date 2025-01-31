import { createContext, MouseEventHandler } from "react";

type AuthContext = {
    isLoggedIn: boolean,
    userId: string | null | undefined,
    userName: string | null | undefined,
    token: string | null | undefined,
    login: Function,
    logout: MouseEventHandler<HTMLButtonElement>,
}

export const AuthContext =
    createContext({
        isLoggedIn: false,
        userId: null,
        userName: null,
        token: null,
        login: () => {},
        logout: () => {}
     } as AuthContext)
