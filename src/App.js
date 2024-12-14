import "./css/noAutoriz.css"
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from "react-router-dom";
import Authorization from "./components/Authorization";
import Registration from "./components/Registration";
import Flats from "./components/Flats";
import ProtectedRoutes from "./utils/ProtectedRoutes";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Authorization />} />
            <Route path="registration" element={<Registration />} />
            <Route element={<ProtectedRoutes/>}>
                <Route path="/flats" element={<Flats />} />
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