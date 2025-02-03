import React, {useEffect, useMemo, useState} from 'react';
import { useTable, usePagination } from 'react-table';
import { useNavigate } from 'react-router-dom';
import HeaderApp from "../HeaderApp"


const Flats = () => {
    const userRole = localStorage.getItem("role");
    const login = localStorage.getItem("login");
    const [flatsData, setFlatsData] = useState();
    useEffect(() => {
        fetch(
            `${process.env.REACT_APP_BASE_URL}/flat`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setFlatsData(data);
            })
            .catch((error) =>
                console.error("Ошибка при загрузке данных:", error)
            );
    }, []);
    const navigate = useNavigate();
    const handleEdit = (id, owner) => {
        if (owner === login || userRole === "ADMIN") {
            navigate(`/edit/${id}`)
        }
    };

    const handleDelete = async (id, owner) => {
        if (owner === login || userRole === "ADMIN") {
            try {
                await fetch(`${process.env.REACT_APP_BASE_URL}/flat/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/flat`);
                const data = await response.json();
                setFlatsData(data);
            } catch (error) {
                console.error('Ошибка при удалении:', error);
            }
        }
    };


    const columns = useMemo(() => [
        { Header: 'id', accessor: 'id' },
        { Header: 'owner', accessor: 'owner'},
        { Header: 'name', accessor: 'name' },
        { Header: 'coordinate-x', accessor: 'coordinateX' },
        { Header: 'coordinate-y', accessor: 'coordinateY' },
        { Header: 'creationDate', accessor: 'creationDate' },
        { Header: 'area', accessor: 'area' },
        { Header: 'numberOfRooms', accessor: 'numberOfRooms'},
        { Header: 'price', accessor: 'price' },
        { Header: 'balcony', accessor: 'balcony', Cell: ({ value }) => value ? 'Есть' : 'Нет' },
        { Header: 'timeToMetroOnFoot', accessor: 'timeToMetroOnFoot' },
        { Header: 'furnish', accessor: 'furnish' },
        { Header: 'view', accessor: 'view' },
        { Header: 'transport', accessor: 'transport' },
        { Header: 'house-name', accessor: 'houseName' },
        { Header: 'house-year', accessor: 'houseYear' },
        { Header: 'house-numberOfFloors', accessor: 'houseNumberOfFloors' },
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
        { columns, data: flatsData ?? [], initialState: { pageIndex: 0, pageSize: 15 } },
        usePagination
    );

    const { pageIndex } = state;

    return (

        <div className="flats-table-wrapper">
            <HeaderApp />
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

export default Flats;
