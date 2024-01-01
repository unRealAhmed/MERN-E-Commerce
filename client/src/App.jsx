import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import AppLayout from "./UI/AppLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Shop from "./UI/shop/Shop";
import ForgotPassward from "./pages/ForgotPassward";
import Sidebar from "./UI/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="side" element={<Sidebar />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-pass" element={<ForgotPassward />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
