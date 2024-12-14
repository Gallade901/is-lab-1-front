import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true); // Для индикатора загрузки

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch(
                    "http://localhost:21751/IS-lab-1-back-1.0-SNAPSHOT/api/controller/checkAuthorization",
                    {
                        method: "GET",
                        credentials: "include", // Обеспечивает передачу куки
                    }
                );

                if (response.ok) {
                    const isAuthorized = await response.json();
                    setIsAuthenticated(isAuthorized);
                } else {
                    setIsAuthenticated(false); // Пользователь не авторизован
                }
            } catch (error) {
                console.error("Ошибка проверки авторизации:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false); // Завершение загрузки
            }
        };

        checkSession();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;
