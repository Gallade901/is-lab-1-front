import React from "react";
import {useLocation, useNavigate} from "react-router-dom";

const HeaderApp = () => {
    const user = localStorage.getItem("user");
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:21751/IS-lab-1-back-1.0-SNAPSHOT/api/controller/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (response.ok) {
                localStorage.removeItem("user");
                window.location.reload();
            } else {
                console.error("Ошибка выхода:", response.status);
            }
        } catch (error) {
            console.error("Ошибка запроса выхода:", error);
        }
    };

    const handleSelectChange = (event) => {
        const selectedPath = event.target.value;
        if (selectedPath) {
            navigate(selectedPath);
        }
    };

    return (
        <header className="header">
            <div className="left">
                <select onChange={handleSelectChange} value={location.pathname}>
                    <option value="/flats">Квартиры</option>
                    <option value="/addFlat">Добавить квартиру</option>
                    <option value="/applications">Заявки</option>
                    <option value="/coordinates">Добавить координаты</option>
                    <option value="/addHouse">Добавить дом</option>
                </select>
            </div>

            <div className="right">
                User: {user}
                {user && <button onClick={handleLogout}>Выйти</button>}
            </div>
        </header>
    );
};

export default HeaderApp;
