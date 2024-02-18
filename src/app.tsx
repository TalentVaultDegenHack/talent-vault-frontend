import { Route, Routes } from "react-router-dom";
import { SignUp } from "@/features/auth/views/sign-up.tsx";
import { SignIn } from "@/features/auth/views/sign-in.tsx";
import { Dashboard } from "@/views/dashboard.tsx";
import { RootLayout } from "@/components/layouts/root-layout.tsx";
import { ProtectedRoute } from "@/components/navigation/protected-route.tsx";
import { useEffect } from "react";
import { authService } from "@/features/auth/services/auth.ts";
import { userSignal } from "@/features/auth/signals/user.ts";
import { loadingSignal } from "@/signals/loading.ts";
import { useSignals } from "@preact/signals-react/runtime";
import {Recruiter} from "@/views/recruiter.tsx";
import {Requests} from "@/views/requests.tsx";
import {Evaluator} from "@/views/evaluator.tsx";
import {Application} from "@/views/application.tsx";
import {Logout} from "@/features/auth/views/logout.tsx";

export const App = () => {
    useSignals();

    useEffect(() => {
        authService
            .profile()
            .then((profile) => {
                if (profile) {
                    userSignal.value = profile.data;
                }
            })
            .finally(() => {
                loadingSignal.value = false;
            });
    }, []);

    return (
        <>
            {!loadingSignal.value && (
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<RootLayout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="recruiter" element={<Recruiter />} />
                            <Route path="requests" element={<Requests />} />
                            <Route path="application/:id" element={<Application />} />
                            <Route path="evaluator" element={<Evaluator />} />
                        </Route>
                    </Route>

                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="logout" element={<Logout />} />
                </Routes>
            )}
        </>
    );
};
