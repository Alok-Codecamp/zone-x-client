import {
    createBrowserRouter,
} from "react-router";
import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import Shop from "./pages/shop/Shop";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        )
    },
    {
        path: "/shop",
        element: (
            <PrivateRoute>
                <Shop />
            </PrivateRoute>
        )
    },

]);

export default router;