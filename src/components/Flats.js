import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import HeaderApp from "./HeaderApp"

const Flats = () => {
    const data = useMemo(() => [
        {
            id: 1,
            name: "Stud",
            coordinate_x: 3,
            coordinate_y: 2,
            creationDate: "2024-01-01",
            area: "sdgsdgsdggdsf",
            price: 1000000,
            balcony: "Есть",
            timeToMetroOnFoot: 10,
            numberOfRooms: 3,
            furnish: "ssdsgsdgd",
            view: "ssdggdd",
            transport: "sdgsdgsd",
            house_name: "ssdgsdgd",
            house_year: 1999,
            house_numberOfFloors: 5,
        },
        {
            id: 2,
            name: "Stud",
            coordinate_x: 4,
            coordinate_y: 2,
            creationDate: "2024-01-01",
            area: "f",
            price: 1000000,
            balcony: "Есть",
            timeToMetroOnFoot: 10,
            numberOfRooms: 3,
            furnish: "sd",
            view: "sd",
            transport: "sd",
            house_name: "sd",
            house_year: 1999,
            house_numberOfFloors: 5,
        },

        // Добавьте сюда другие объекты flats
    ], []);

    const columns = useMemo(() => [
        { Header: 'id', accessor: 'id' },
        { Header: 'name', accessor: 'name' },
        { Header: 'coordinate-x', accessor: 'coordinate_x' },
        { Header: 'coordinate-y', accessor: 'coordinate_y' },
        { Header: 'creationDate', accessor: 'creationDate' },
        { Header: 'area', accessor: 'area' },
        { Header: 'price', accessor: 'price' },
        { Header: 'balcony', accessor: 'balcony' },
        { Header: 'timeToMetroOnFoot', accessor: 'timeToMetroOnFoot' },
        { Header: 'numberOfRooms', accessor: 'numberOfRooms' },
        { Header: 'furnish', accessor: 'furnish' },
        { Header: 'view', accessor: 'view' },
        { Header: 'transport', accessor: 'transport' },
        { Header: 'house-name', accessor: 'house_name' },
        { Header: 'house-year', accessor: 'house_year' },
        { Header: 'house-numberOfFloors', accessor: 'house_numberOfFloors' },
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
        { columns, data, initialState: { pageIndex: 0, pageSize: 10 } }, // initialState pageSize = 2 для демонстрации
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
