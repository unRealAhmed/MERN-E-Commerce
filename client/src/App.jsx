import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import AppLayout from "./UI/AppLayout";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
