import React from "react";
import HeaderApp from "../HeaderApp";

class AddFlat extends React.Component {
    flat = this.props.flat
    render() {
        return (
            <div>
                <HeaderApp/>
                <div className="form-flat">
                    <form className="form-add-flat">
                        <input placeholder="name"/>
                        <input placeholder="Coordinate-x"/>
                        <input placeholder="Coordinate-y"/>
                        <input type="Number" placeholder="area"/>
                        <input type="Number" placeholder="price"/>
                        <label htmlFor="balcony">Balcony:</label>
                        <input type="checkbox" id="balcony" name="balcony"/>
                        <br/>
                        <input type="Number" placeholder="timeToMetroOnFoot"/>
                        <input type="Number" placeholder="numberOfRooms"/>

                        <label htmlFor="furnish">Furnish:</label>
                        <select id="furnish" name="furnish">
                            <option value="DESIGNER">Designer</option>
                            <option value="NONE">None</option>
                            <option value="FINE">Fine</option>
                            <option value="LITTLE">Little</option>
                        </select>

                        <label htmlFor="view">View:</label>
                        <select id="view" name="view">
                            <option value="YARD">Yard</option>
                            <option value="PARK">Park</option>
                            <option value="TERRIBLE">Terrible</option>
                        </select>

                        <label htmlFor="transport">Transport:</label>
                        <select id="transport" name="transport">
                            <option value="FEW">Few</option>
                            <option value="NONE">None</option>
                            <option value="LITTLE">Little</option>
                            <option value="NORMAL">Normal</option>
                            <option value="ENOUGH">Enough</option>
                        </select>

                        <input placeholder="House-name"/>
                        <input type="Number" placeholder="House-year"/>
                        <input type="Number" placeholder="House-numberOfFloors"/>

                        <button type="button">Добавить</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddFlat