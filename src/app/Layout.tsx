import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}