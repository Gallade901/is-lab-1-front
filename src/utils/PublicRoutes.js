import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    "http://localhost:21751/IS-lab-1-back-1.0-SNAPSHOT/api/controller/checkAuthorization",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    const isAuthorized = await response.json();
                    setIsAuthenticated(isAuthorized);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Ошибка проверки авторизации:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/flats" replace />;
    }

    return <Outlet />;
};

export default PublicRoutes;
