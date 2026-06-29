import {
  createHashRouter,
} from "react-router-dom";

import Layout from "./Layout";

import PracticePage from "../pages/Practice/PracticePage";
import AboutPage from "../pages/AboutPage/AboutPage";

export const router =
  createHashRouter(
    [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <PracticePage />,
          },
          {
            path: "/about",
            element: <AboutPage />,
          },
          {
            path: "*",
            element: <PracticePage />,
          },
        ],
      },
    ],
    
  );