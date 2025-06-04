import {
    createBrowserRouter,
} from "react-router";
import App from "./App";
import Dashboard from "./pages/dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },

]);

export default router;