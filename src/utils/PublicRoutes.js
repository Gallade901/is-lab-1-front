import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/user/checkAuthorization`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    setIsAuthenticated(true)
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
