import "./css/noAutoriz.css"
import {
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
    useLocation
} from "react-router-dom";
import Authorization from "./components/Authorization";
import Registration from "./components/Registration";
import Flats from "./components/entity/flat/Flats";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoutes";
import ApplicationsAdmin from "./components/ApplicationsAdmin";
import AddFlat from "./components/entity/flat/AddFlat";
import AddHouse from "./components/entity/house/AddHouse";
import AddCoordinate from "./components/entity/coordinate/AddCoordinate";
import EditFlat from "./components/entity/flat/EditFlat";
import Houses from "./components/entity/house/Houses";
import EditHouse from "./components/entity/house/EditHouse";
import Coordinates from "./components/entity/coordinate/Coordinates";
import EditCoordinate from "./components/entity/coordinate/EditCoordinate";
import Functions from "./components/Functions";



const ProtectedRoutesWrapper = () => {
    const location = useLocation();
    return <ProtectedRoutes key={location.pathname} />;
};
const basename = document.querySelector('base')?.getAttribute('href') ?? '/'
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<Authorization />} />
                <Route path="registration" element={<Registration />} />
            </Route>
            <Route element={<ProtectedRoutesWrapper />}>
                <Route path="/applications" element={<ApplicationsAdmin />} />
                <Route path="/flats" element={<Flats />} />
                <Route path="/addFlat" element={<AddFlat />} />
                <Route path="/addHouse" element={<AddHouse />} />
                <Route path="/addCoordinate" element={<AddCoordinate />} />
                <Route path="/editFlat/:id" element={<EditFlat />} />
                <Route path="/houses" element={<Houses/> } />
                <Route path="/editHouse/:id" element={<EditHouse/>} />
                <Route path="/coordinates" element={<Coordinates/>} />
                <Route path="/editCoordinate/:id" element={<EditCoordinate/>} />
                <Route path="/functions" element={<Functions/>} />
            </Route>
        </Route>
    ), {basename}
);

const App = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;