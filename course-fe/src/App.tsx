import Header from "./components/user/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router";
import "./styles/user/App.scss";

function App() {
  return (
    <>
      <div className="app-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="main-container">
          <div className="app-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;