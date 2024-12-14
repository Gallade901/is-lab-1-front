import React from "react";

const HeaderApp = () => {
    const user = localStorage.getItem("user");
    const handleLogout = () => {
        localStorage.removeItem("user")
    };

    return (
        <header className="header">
            <div className="right">
                User: {user}
                {user && <button onClick={handleLogout}>Выйти</button>}
            </div>
        </header>
    );
};

export default HeaderApp;
