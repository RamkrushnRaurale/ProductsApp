import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        localStorage.getItem("token") ? { isAuth: true } : null
    );

    const login = (token) => {
        localStorage.setItem("token", token);
        setUser({ isAuth: true });
        console.log("✅ Real JWT Token stored:", token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        console.log("Logged out successfully");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
