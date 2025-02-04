import React, {useEffect, useMemo, useState, useRef} from 'react';
import { useTable, usePagination } from 'react-table'; // Исправленный импорт
import { useNavigate } from 'react-router-dom';
import HeaderApp from "../../HeaderApp"


const Coordinates = () => {
    const userRole = localStorage.getItem("role");
    const login = localStorage.getItem("login");
    const [coordinatesData, setCoordinatesData] = useState();
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const wsRef = useRef(null);
    useEffect(() => {
        const RECONNECT_DELAY = 1000;
        const MAX_RECONNECT_ATTEMPTS = 10;

        const startReconnect = () => {
            setTimeout(() => {
                if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
                    wsRef.current = new WebSocket(`${process.env.REACT_APP_WS_URL}/coordinate`);

                    wsRef.current.onopen = () => {
                        console.log(`Успешное переподключение (попытка ${reconnectAttempts + 1})`);
                        setReconnectAttempts(0);
                    };

                    wsRef.current.onmessage = (event) => {
                        try {
                            const data = JSON.parse(event.data);
                            setCoordinatesData(data);
                        } catch (error) {
                            console.error('Ошибка при обработке сообщения:', error);
                        }
                    };

                    wsRef.current.onerror = (error) => {
                        console.error('Ошибка при переподключении:', error);
                        setReconnectAttempts(prev => prev + 1);
                        startReconnect();
                    };

                    wsRef.current.onclose = (event) => {
                        if (!event.wasClean) {
                            console.log('Соединение было прервано неожиданно');
                            setReconnectAttempts(prev => prev + 1);
                            startReconnect();
                        } else {
                            console.log('Соединение было закрыто чисто');
                        }
                    };
                } else {
                    console.error('Превышено максимальное количество попыток переподключения');

                }
            }, RECONNECT_DELAY * Math.pow(2, reconnectAttempts));
        };

        startReconnect();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };

    }, []);
    const navigate = useNavigate();
    const handleEdit = (id, owner) => {
        if (owner === login || userRole === "ADMIN") {
            navigate(`/editCoordinate/${id}`)
        }
    };

    const handleDelete = async (id, owner) => {
        if (owner === login || userRole === "ADMIN") {
            try {
                await fetch(`${process.env.REACT_APP_BASE_URL}/coordinates/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/coordinates`);
                const data = await response.json();
                setCoordinatesData(data);
            } catch (error) {
                console.error('Ошибка при удалении:', error);
            }
        }
    };

    const columns = useMemo(() => [
        { Header: 'id', accessor: 'id' },
        { Header: 'owner', accessor: 'owner'},
        { Header: 'coordinate-x', accessor: 'x' },
        { Header: 'coordinate-y', accessor: 'y' },
        {
            Header: 'Изменить',
            Cell: ({ row }) => (
                <button onClick={() => handleEdit(row.original.id, row.original.owner)} className="edit-button">
                    Изменить
                </button>
            )
        },
        {
            Header: 'Удалить',
            Cell: ({ row }) => (
                <button onClick={() => handleDelete(row.original.id, row.original.owner)} className="delete-button">
                    Удалить
                </button>
            )
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable(
        { columns, data: coordinatesData ?? [], initialState: { pageIndex: 0, pageSize: 15 }},
        usePagination,
    );

    const { pageIndex } = state;

    return (

        <div className="flats-table-wrapper">
            <HeaderApp/>
            <div className="flats-table-wr">
                <table {...getTableProps()} className="flats-table">
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    Previous
                </button>
                <span>Page{' '}
                    <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default Coordinates;
