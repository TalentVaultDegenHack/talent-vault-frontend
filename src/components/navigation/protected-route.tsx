import { Navigate, Outlet } from 'react-router-dom';
import {userSignal} from "@/features/auth/signals/user.ts";

export const ProtectedRoute = () => {
    if (!userSignal.value) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
};
