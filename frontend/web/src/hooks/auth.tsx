import { AuthContext } from "@/context/authContext";
import { AuthContextType } from "@/types/auth";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};