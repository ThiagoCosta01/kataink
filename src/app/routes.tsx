import { createBrowserRouter } from "react-router-dom";


import Practice from "../pages/Practice/Practice";


export const router = createBrowserRouter([
    {
        path: "/practice",
        element: <Practice />,
    },
    {
        path: "/*",
        element: <Practice />,
    },
]);