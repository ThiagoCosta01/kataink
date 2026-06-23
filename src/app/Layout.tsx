import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer/Footer";

export default function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}