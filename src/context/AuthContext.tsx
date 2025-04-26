"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { login } from "@/services/apiService";

interface UserBody {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    token: string | null;
    loading: boolean;
    handleLogin:(user: UserBody) => Promise<LoginResponse | undefined>;
    handleLogout: () => void;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initializaToken = () =>{
            const storedToken = localStorage.getItem('token');
            if(storedToken){
                setIsAuthenticated(true);
                setToken(storedToken);
            }
            setLoading(false);
        }

        initializaToken();
    }, []);

    const handleLogin = async (user: UserBody) => {
        try {
            const response = await login(user);
            if (response.token) {  // ✅ Solo redirige si hay token
                setIsAuthenticated(true);
                setToken(response.token);
                localStorage.setItem('token', response.token);
                window.location.href = '/upload-file';  // ← Redirección aquí
                return response;
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { token: '' };
        }
    };

    const handleLogout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
    }

    const value: AuthContextType = {
        isAuthenticated,
        token,
        loading,
        handleLogin,
        handleLogout
    };

    return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
  