import React, { useEffect, useState } from "react";
import HeaderApp from "./HeaderApp";

const ApplicationsAdmin = () => {
    const [applications, setApplications] = useState([]);
    const fetchApplications = async () => {
        try {
            const response = await fetch(
                "http://localhost:21751/IS-lab-1-back-1.0-SNAPSHOT/api/controller/applications",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (response.ok) {
                const data = await response.json(); // Парсим JSON-ответ
                setApplications(data); // Устанавливаем полученные заявки
            } else {
                console.error("Ошибка при загрузке заявок:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка запроса заявок:", error);
        }
    };

    const answerApplication = async (login, flag) => {
        try {
            const response = await fetch(
                "http://localhost:21751/IS-lab-1-back-1.0-SNAPSHOT/api/controller/answerApplication",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ login, flag }),
                }
            );

            if (response.ok) {
                fetchApplications();
            } else {
                console.error("Ошибка при ответе на заявку:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка запроса на ответ заявки:", error);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div>
            <HeaderApp/>
            <h1>Заявки на регистрацию</h1>
            <br/>
            <div>
                {applications.length > 0 ? (
                    <ul>
                        {applications.map((app) => (
                            <li key={app.login} style={{marginBottom: "10px"}}>
                                <span style={{marginRight: "20px"}}>
                                    Логин: {app.login}
                                </span>
                                <button style={{marginRight: "10px"}}
                                        onClick={() => answerApplication(app.login, true)}>Одобрить
                                </button>
                                <button onClick={() => answerApplication(app.login, false)}>Отклонить</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Заявок нет</p>
                )}
            </div>
        </div>
    );

}


export default ApplicationsAdmin;
