import { useState} from "react";
import axios from 'axios';
import HeaderApp from "./HeaderApp";

const Functions = () => {
    const [view, setView] = useState();
    const [prefix, setPrefix] = useState();
    const [messageView, setMessageView] = useState('');
    const [messagePrefix, setMessagePrefix] = useState('');
    const [messageCheaper, setMessageCheaper] = useState('');
    const [flats, setFlats] = useState([]);
    function clearMessage() {
        setFlats([]);
        setMessageView('');
        setMessageCheaper('');
        setMessagePrefix('');
    }
    const handleSubmitView = async (event) => {
        event.preventDefault();
        clearMessage();
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/functions/view`, null, {
                params: { view: view },
                withCredentials: true
            });
            setMessageView('Функция успешно выполнена');
        } catch (error) {
            setMessageView(`Ошибка: ${error.response?.data || error.message}`);
        }
    };
    const handleSubmitPrefix = async (event) => {
        event.preventDefault();
        clearMessage();
        try {
            const {data} = await axios.post(`${process.env.REACT_APP_BASE_URL}/functions/prefix`, null, {
                params: { prefix: prefix },
                withCredentials: true
            });
            setFlats(data);
        } catch (error) {
            setMessagePrefix(`Ошибка: ${error.response?.data || error.message}`);
        }
    };

    const handleSubmitCheaper = async (event) => {
        event.preventDefault();
        clearMessage();
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/functions/cheaper`, {
                withCredentials: true
            });
            if (data === "Квартир с балконом нет") {
                setMessageCheaper(data);
            }
            else {
                setFlats(data);
            }
        } catch (error) {
            setMessageCheaper(`Ошибка: ${error.response?.data || error.message}`);
        }
    };

    const handleSubmitMetro = async (event) => {
        event.preventDefault();
        clearMessage();
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/functions/metro`, {
                withCredentials: true
            });
            setFlats(data);
        } catch (error) {
            setMessageCheaper(`Ошибка: ${error.response?.data || error.message}`);
        }
    };

    return (
        <div>
            <HeaderApp/>
            <div className="full">
                <div className="flat-deletion-view">
                    <form onSubmit={handleSubmitView}>
                        <label htmlFor="view">Значение поля view:</label>
                        <input
                            id="view"
                            type="text"
                            value={view}
                            onChange={(e) => setView(e.target.value)}
                        />
                        <button type="submit">Удалить объект</button>
                    </form>
                    {messageView && <div className="message">{messageView}</div>}
                </div>
                <div className="flat-by-prefix">
                    <form onSubmit={handleSubmitPrefix}>
                        <label htmlFor="prefix">Введите подстроку:</label>
                        <input
                            id="prefix"
                            type="text"
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                        />
                        <button type="submit">Получить массив</button>
                    </form>
                    {messagePrefix && <div className="message">{messagePrefix}</div>}
                </div>
                <div className="flat-cheaper">
                    <form onSubmit={handleSubmitCheaper}>
                        <button type="submit">Получить самую дешевую квартиру с балконом</button>
                    </form>
                    {messageCheaper && <div className="message">{messageCheaper}</div>}
                </div>
                <div className="flat-metro">
                    <form onSubmit={handleSubmitMetro}>
                        <button type="submit">Квартиры с отсортированным временем до метро</button>
                    </form>
                </div>
                <br/>
                {flats.length > 0 && (
                    <div className="flats-list">
                        {flats.map(flat => (
                            <div key={flat.id} className="flat-item">
                                <h3>{flat.name}</h3>
                                <p>Время до метро: {flat.timetometroonfoot}</p>
                                <p>Площадь: {flat.area} м²</p>
                                <p>Количество комнат: {flat.numberofrooms}</p>
                                <p>Цена: {flat.price}</p>
                                <p>Расстояние до метро: {flat.timetometroonfoot} мин</p>
                                <p>Дата создания: {flat.creationdate}</p>
                                <br/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Functions