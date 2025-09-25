import "./styles/App.scss";
import Header from "./Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router";

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
