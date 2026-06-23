import {
  createBrowserRouter,
} from "react-router-dom";

import Layout from "./Layout";

import PracticePage from "../pages/Practice/PracticePage";

export const router =
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PracticePage />,
        },
      ],
    },
  ]);