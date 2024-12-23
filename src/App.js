import "./css/noAutoriz.css"
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Authorization from "./components/Authorization";
import Registration from "./components/Registration";
import Flats from "./components/entity/Flats";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import ApplicationsAdmin from "./components/ApplicationsAdmin";
import AddFlat from "./components/entity/AddFlat";
import AddHouse from "./components/entity/AddHouse";
import AddCoordinate from "./components/entity/AddCoordinate";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<PublicRoutes/>}>
                <Route path="/" element={<Authorization />} />
                <Route path="registration" element={<Registration />} />
            </Route>
            <Route element={<ProtectedRoutes/>}>
                <Route path="/applications" element={<ApplicationsAdmin />} />
                <Route path="/flats" element={<Flats />} />
                <Route path="/addFlat" element={<AddFlat/>}/>
                <Route path="/addHouse" element={<AddHouse/>}/>
                <Route path="addCoordinate" element={<AddCoordinate/>}/>
            </Route>
        </Route>
    )
)

const App = () => {

    return (
        <RouterProvider router={router}/>
    )
}

export default App