import React from "react";

class Flat extends React.Component {
    flat = this.props.flat
    render() {
        return (
            <tr>
                <td>{this.flat.id}</td>
                <td>{this.flat.name}</td>
                <td>{this.flat.coordinate_x}</td>
                <td>{this.flat.coordinate_y}</td>
                <td>{this.flat.creationDate}</td>
                <td>{this.flat.area}</td>
                <td>{this.flat.price}</td>
                <td>{this.flat.balcony}</td>
                <td>{this.flat.timeToMetroOnFoot}</td>
                <td>{this.flat.numberOfRooms}</td>
                <td>{this.flat.furnish}</td>
                <td>{this.flat.view}</td>
                <td>{this.flat.transport}</td>
                <td>{this.flat.house_name}</td>
                <td>{this.flat.house_year}</td>
                <td>{this.flat.house_numberOfFloors}</td>
            </tr>
        )
    }
}

export default Flat