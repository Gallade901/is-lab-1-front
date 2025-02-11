import React, {useEffect, useState} from "react";
import HeaderApp from "../../HeaderApp";
import {useNavigate, useParams} from "react-router-dom";

const EditCoordinate = () => {
    const login = localStorage.getItem("login");
    const { id } = useParams();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [formData, setFormData] = useState({
        id: 0,
        x: 0,
        y: 0,
    });

    const [serverResponse, setServerResponse] = useState('');

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}/coordinates/getId?id=${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            }
        )
            .then(async response => {
                if (!response.ok) {
                    navigate("/coordinates");
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Пустой ответ от сервера');
                }
                if (data.owner !== login && role !== "ADMIN") {
                    navigate("/coordinates")
                }
                setFormData({
                        ...data,
                    }
                );
            })
            .catch((error) =>
                console.error("Ошибка при загрузке данных:", error)
            );
    }, []);


    const [errors, setErrors] = useState({
        x: false,
        y: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (!Number.isInteger(Number(value)) && value !== "") {
            return;
        }
        if (name === "y" && value > 965) {
            setFormData({
                ...formData,
                [name]: 965,
            });
            return;
        }

        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: false,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {
            x: formData.x === "",
            y: (formData.y > 965 || formData.y === ""),
        };

        if (validationErrors.x || validationErrors.y) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/coordinates`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
                    credentials: "include",
                }
            );
            if (response.ok) {
                const result = await response.text();
                setServerResponse(result);
            } else {
                setServerResponse("Ошибка отправки");
            }
            navigate("/coordinates");
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при отправке запроса');
        }
    };

    return (
        <div>
            <HeaderApp />
            <div className="add-component">
                <form className="form-add" onSubmit={handleSubmit}>
                    <input
                        type="number"
                        name="x"
                        value={formData.x}
                        placeholder="Coordinate-x"
                        onChange={handleChange}
                    />
                    {errors.x && <div className="error-field">Поле X не должно быть пустым</div>}

                    <input
                        type="number"
                        name="y"
                        value={formData.y}
                        placeholder="Coordinate-y (max 965)"
                        onChange={handleChange}
                        max="965"
                    />
                    {errors.y && <div className="error-field">Поле Y не должно быть пустым</div>}

                    <button type="submit">Изменить</button>
                    <div>{serverResponse}</div>
                </form>
            </div>
        </div>
    );
};

export default EditCoordinate;
