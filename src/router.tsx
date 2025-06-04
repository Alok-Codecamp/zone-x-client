import {
    createBrowserRouter,
} from "react-router";
import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";
import SignUp from "./pages/auth/SignUp";

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
        element: <Dashboard />,
    },

]);

export default router;