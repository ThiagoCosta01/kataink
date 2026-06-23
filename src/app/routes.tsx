import {
  createBrowserRouter,
} from "react-router-dom";

import Layout from "./Layout";

import PracticePage from "../pages/Practice/PracticePage";
import AboutPage from "../pages/AboutPage/AboutPage";

export const router =
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <PracticePage />,
        },
        {
          path: "*",
          element: <PracticePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        }
      ],
    },
  ]);