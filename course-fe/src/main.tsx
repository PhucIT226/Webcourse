import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
// import "./styles/user/index.scss";
import "./styles/user/App.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
