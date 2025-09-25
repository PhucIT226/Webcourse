import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router";
import App from "./App";
import Intro from "./Intro/Intro";
import Home from "./Home/Home";

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
