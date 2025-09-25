import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layouts/user/Layout.tsx";
import "./styles/user/index.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Layout />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
