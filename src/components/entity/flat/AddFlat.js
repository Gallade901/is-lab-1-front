import React, { useState, useEffect } from "react";
import HeaderApp from "../../HeaderApp";

const AddFlat = () => {
    const login = localStorage.getItem("login");
    const [formData, setFormData] = useState({
        name: "",
        coordinatesId: 0,
        coordinateX: "",
        coordinateY: "",
        area: "",
        price: "",
        balcony: false,
        timeToMetroOnFoot: "",
        numberOfRooms: "",
        furnish: null,
        view: null,
        transport: "",
        houseId: 0,
        houseName: "",
        houseYear: null,
        houseNumberOfFloors: null,
        login: login,
    });
    const [housesData, setHousesData] = useState();
    const [coordinatesData, setCoordinatesData] = useState();

    const [errors, setErrors] = useState({});
    const [serverResponse, setServerResponse] = useState("");

    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}/house`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        }
        )
            .then((response) => response.json())
            .then((data) => {
                setHousesData(data);
            })
            .catch((error) =>
                console.error("Ошибка при загрузке данных:", error)
            );
        fetch(
            `${process.env.REACT_APP_BASE_URL}/coordinates`,
        {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
            },
            credentials: "include",
        }
        )
            .then((response) => response.json())
            .then((data) => {
                setCoordinatesData(data);
            })
            .catch((error) =>
                console.error("Ошибка при загрузке данных:", error)
            );
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        const validationErrors = {};

        if (!formData.name.trim())
            validationErrors.name = "Имя не может быть пустым";

        if (formData.coordinateX === "") {
            validationErrors.coordinateX =
                "X не должен быть пустым";
        }
        if (
            formData.coordinateY === "" ||
            (formData.coordinateY > 965)
        ) {
            validationErrors.coordinateY = "Y должен быть до 965";
        }

        if (!formData.area || formData.area <= 0 || formData.area > 521) {
            validationErrors.area = "Площадь должна быть от 1 до 521";
        }

        if (!formData.price || formData.price <= 0 || formData.price > 648728965) {
            validationErrors.price = "Цена должна быть от 1 до 648728965";
        }

        if (!formData.timeToMetroOnFoot || formData.timeToMetroOnFoot <= 0) {
            validationErrors.timeToMetroOnFoot =
                "Время до метро должно быть больше 0";
        }

        if (
            !formData.numberOfRooms ||
            formData.numberOfRooms <= 0 ||
            formData.numberOfRooms > 11
        ) {
            validationErrors.numberOfRooms =
                "Количество комнат должно быть от 1 до 11";
        }

        if (!formData.transport) {
            validationErrors.transport = "Транспорт должен быть выбран";
        }

        if (formData.houseId === "0" && (formData.houseYear <= 0 || formData.houseYear > 681)) {
            validationErrors.houseYear = "Год дома должен быть от 1 до 681";
        }

        if (
            formData.houseId === "0" &&
            (formData.houseNumberOfFloors <= 0 ||
                formData.houseNumberOfFloors > 80)
        ) {
            validationErrors.houseNumberOfFloors =
                "Этажей в доме должно быть от 1 до 80";
        }

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const [isNewHouse, setIsNewHouse] = useState(true);
    const [isNewCoordinate, setIsNewCoordinate] = useState(true);

    const handleHouseChange = (e) => {
        const selectedHouseId = e.target.value;
        if (selectedHouseId === "0" || selectedHouseId === "-1") {
            if (selectedHouseId === "-1") {
                setIsNewHouse(false);
            } else {
                setIsNewHouse(true);
            }
            setFormData({
                ...formData,
                houseId: selectedHouseId,
                houseName: "",
                houseYear: null,
                houseNumberOfFloors: null,
            });
        } else {
            let selectedHouse;
            if (Array.isArray(housesData)) {
                selectedHouse = housesData.find(
                    house => house.id === parseInt(selectedHouseId)
                );
            }
            setFormData({
                ...formData,
                houseId: selectedHouse?.id,
                houseName: selectedHouse?.name,
                houseYear: selectedHouse?.year,
                houseNumberOfFloors: selectedHouse?.numberOfFloors,
            });
            setIsNewHouse(false);
        }
    };

    const handleCoordinateChange = (e) => {
        const selectedCoordinateId = e.target.value;
        if (selectedCoordinateId === "0") {
            setIsNewCoordinate(true);
            setFormData({
                ...formData,
                coordinatesId: 0,
                coordinateX: "",
                coordinateY: "",
            });
        } else {
            let selectedCoordinate;
            if (Array.isArray(coordinatesData)) {
                selectedCoordinate = coordinatesData.find(
                    (coordinates) => coordinates.id === parseInt(selectedCoordinateId)
                );
            }
            setFormData({
                ...formData,
                coordinatesId: selectedCoordinate?.id,
                coordinateX: selectedCoordinate?.x,
                coordinateY: selectedCoordinate?.y,
            });
            setIsNewCoordinate(false);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            setServerResponse("");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BASE_URL}/flat`,
                {
                    method: "POST",
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
                    <input
                        name="name"
                        placeholder="Имя"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <div className="error-field">{errors.name}</div>}

                    <select
                        name="coordinates"
                        value={formData.coordinatesId}
                        onChange={handleCoordinateChange}
                    >
                        <option value="0">Создать координаты</option>
                        {coordinatesData?.map((coordinates) => (
                            <option key={coordinates.id} value={coordinates.id}>
                                {coordinates.id}-({coordinates.x}, {coordinates.y})
                            </option>
                        ))}
                    </select>
                    <input
                        name="coordinateX"
                        type="number"
                        placeholder="Координата X"
                        value={formData.coordinateX}
                        onChange={handleChange}
                        disabled={!isNewCoordinate}
                    />
                    {errors.coordinateX && <div className="error-field">{errors.coordinateX}</div>}
                    <input
                        name="coordinateY"
                        type="number"
                        placeholder="Координата Y"
                        value={formData.coordinateY}
                        onChange={handleChange}
                        disabled={!isNewCoordinate}
                    />
                    {errors.coordinateY && <div className="error-field">{errors.coordinateY}</div>}
                    {errors.coordinates && (
                        <div className="error-field">{errors.coordinates}</div>
                    )}

                    <input
                        name="area"
                        type="number"
                        placeholder="Площадь"
                        value={formData.area}
                        onChange={handleChange}
                    />
                    {errors.area && <div className="error-field">{errors.area}</div>}

                    <input
                        name="price"
                        type="number"
                        placeholder="Цена"
                        value={formData.price}
                        onChange={handleChange}
                    />
                    {errors.price && <div className="error-field">{errors.price}</div>}

                    <label>
                        <input
                            name="balcony"
                            type="checkbox"
                            checked={formData.balcony}
                            onChange={handleChange}
                        />
                        Есть балкон
                    </label>

                    <input
                        name="timeToMetroOnFoot"
                        type="number"
                        placeholder="Время до метро (минуты)"
                        value={formData.timeToMetroOnFoot}
                        onChange={handleChange}
                    />
                    {errors.timeToMetroOnFoot && (
                        <div className="error-field">
                            {errors.timeToMetroOnFoot}
                        </div>
                    )}

                    <input
                        name="numberOfRooms"
                        type="number"
                        placeholder="Количество комнат"
                        value={formData.numberOfRooms}
                        onChange={handleChange}
                    />
                    {errors.numberOfRooms && (
                        <div className="error-field">{errors.numberOfRooms}</div>
                    )}

                    <select
                        name="furnish"
                        value={formData.furnish}
                        onChange={handleChange}
                    >
                        <option value={null}>Выбрать отделку</option>
                        <option value="DESIGNER">Дизайнерская</option>
                        <option value="NONE">Без отделки</option>
                        <option value="FINE">Хорошая</option>
                        <option value="LITTLE">Умеренная</option>
                    </select>

                    <select name="view" value={formData.view} onChange={handleChange}>
                        <option value={null}>Выбрать вид</option>
                        <option value="YARD">На двор</option>
                        <option value="PARK">На парк</option>
                        <option value="TERRIBLE">Ужасный</option>
                    </select>

                    <select
                        name="transport"
                        value={formData.transport}
                        onChange={handleChange}
                    >
                        <option value="">Выбрать транспорт</option>
                        <option value="FEW">Мало</option>
                        <option value="NONE">Нет</option>
                        <option value="LITTLE">Немного</option>
                        <option value="NORMAL">Нормально</option>
                        <option value="ENOUGH">Достаточно</option>
                    </select>
                    {errors.transport && (
                        <div className="error-field">{errors.transport}</div>
                    )}

                    <select name="house" onChange={handleHouseChange} value={formData.houseId}>
                        <option value="-1">Без дома</option>
                        <option value="0">Создать новый дом</option>
                        {housesData?.map((house) => (
                            <option key={house.id} value={house.id}>
                                {house.id + "-" + house.name || "Без названия"}
                            </option>
                        ))}
                    </select>
                    <input
                        name="houseName"
                        placeholder="Имя дома"
                        value={formData.houseName}
                        onChange={handleChange}
                        disabled={!isNewHouse}
                    />
                    <input
                        name="houseYear"
                        type="number"
                        placeholder="Год постройки"
                        value={formData.houseYear}
                        onChange={handleChange}
                        disabled={!isNewHouse}
                    />
                    {errors.houseYear && (
                        <div className="error-field">{errors.houseYear}</div>
                    )}
                    <input
                        name="houseNumberOfFloors"
                        type="number"
                        placeholder="Этажей в доме"
                        value={formData.houseNumberOfFloors}
                        onChange={handleChange}
                        disabled={!isNewHouse}
                    />
                    {errors.houseNumberOfFloors && (
                        <div className="error-field">{errors.houseNumberOfFloors}</div>
                    )}

                    <button type="submit">Добавить</button>
                    <div>{serverResponse}</div>
                </form>
            </div>
        </div>
    );
};

export default AddFlat;
