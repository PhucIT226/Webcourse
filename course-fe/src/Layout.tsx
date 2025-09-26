import "./styles/user/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import Intro from "./pages/user/Intro/Intro";
import App from "./App";
import Home from "./pages/user/Home/Home";

const Layout = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/courses" element={<App />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default Layout;
