import React, {useEffect, useState} from "react";
import HeaderApp from "../../HeaderApp";
import {useNavigate, useParams} from "react-router-dom";

const EditHouse = () => {
    const login = localStorage.getItem("login");
    const { id } = useParams();
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        year: "",
        numberOfFloors: "",
    });

    const [serverResponse, setServerResponse] = useState("");

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}/house/getId?id=${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(async response => {
                if (!response.ok) {
                    navigate("/houses");
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (!data) {
                    throw new Error('Пустой ответ от сервера');
                }
                if (data.owner !== login && role !== "ADMIN") {
                    navigate("/houses")
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
        name: false,
        year: false,
        numberOfFloors: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "year" && value > 681) {
            setFormData({
                ...formData,
                [name]: 681,
            });
            return;
        }

        if (name === "numberOfFloors" && value > 80) {
            setFormData({
                ...formData,
                [name]: 80,
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

    const validateForm = () => {
        const validationErrors = {
            year: !(formData.year && formData.year > 0 && formData.year <= 681),
            numberOfFloors: !(formData.numberOfFloors && formData.numberOfFloors > 0 && formData.numberOfFloors <= 80),
        };

        setErrors(validationErrors);

        return !Object.values(validationErrors).some((error) => error);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/house`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
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
            navigate("/houses");
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при отправке запроса");
        }
    };

    return (
        <div>
            <HeaderApp />
            <div className="add-component">
                <form className="form-add" onSubmit={handleSubmit}>
                    <div>
                        <input
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            name="year"
                            placeholder="Year (1-681)"
                            value={formData.year}
                            onChange={handleChange}
                        />
                        {errors.year && (
                            <div className="error-field">
                                Год должен быть от 1 до 681
                            </div>
                        )}
                    </div>
                    <div>
                        <input
                            type="number"
                            name="numberOfFloors"
                            placeholder="Number of Floors (1-80)"
                            value={formData.numberOfFloors}
                            onChange={handleChange}
                        />
                        {errors.numberOfFloors && (
                            <div className="error-field">
                                Количество этажей должно быть от 1 до 80
                            </div>
                        )}
                    </div>
                    <button type="submit">Изменить</button>
                    <div>{serverResponse}</div>
                </form>
            </div>
        </div>
    );
};

export default EditHouse;
