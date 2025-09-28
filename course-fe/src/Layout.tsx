import "./styles/user/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Intro from "./pages/user/Intro/Intro";
import App from "./App";
import Home from "./pages/user/Home/Home";
import Login from "./Auth/login";
import Register from "./Auth/register";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/courses" element={<App />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Layout;
