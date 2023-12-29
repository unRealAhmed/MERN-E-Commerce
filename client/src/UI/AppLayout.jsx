import { Outlet } from "react-router-dom";

import Footer from "./footer/Footer";
import Header from "./Header/Header";

const AppLayout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default AppLayout;
